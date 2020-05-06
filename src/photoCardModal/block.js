/**
 * Block dependencies
 */
//import classnames from 'classnames';
import icon from './icon';
import './style.css';
import './editor.css';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Editable,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    InspectorControls,
    RichText,
    URLInput,
    InnerBlocks,
} = wp.blockEditor;
const {
    Button,
    SelectControl,
    RadioControl,
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
} = wp.components;
const { Fragment } = wp.element;


/**
 * Register example block
 */
export default registerBlockType(
    'cgb/photo-card-modal',
    {
        title: 'Photo Modal Card',
        description:  'Create a photo card with modal (pop up) content.',
        category: 'custom-cards',
        icon: {
               foreground: '#fff',
               background: '#3883d6',
            src: icon,
        },
        keywords: [
            'modal',
            'pop up',
            'image'
        ],
        attributes: {
             imgURL: {
                 type: 'string',
             },
             imgID: {
                 type: 'number',
             },
             imgAlt: {
                 type: 'string',
                 source: 'attribute',
                 attribute: 'alt',
                 selector: 'img',
            },
             cardTitle: {
                type: 'string',
                source: 'text',
                selector: '.modal-card-title-input',
             },
             content: {
                 type: 'array',
                 source: 'children',
                 selector: '.modal-card-content-body',
            },
             titleID: {
                  type: 'string'
             },
        },

        edit: props => {
            const { attributes: { imgID, imgURL, imgAlt, cardTitle, content, titleID }, className, isSelected, setAttributes } = props;

            const onChangeTitle = cardTitle => { setAttributes( { cardTitle } ) };
            const onChangeContent = content => { setAttributes( { content } ) };

            console.log("Modal photo card loading? 423p");

            function slugify(text) {

                if( !text ) { return ''; }
                   return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
                 }

            const setTitleID = titleID => { setAttributes( { titleID : slugify(cardTitle) } ) };
            setTitleID();

            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }


            return (
			  <Fragment>
                 <InspectorControls>

               </InspectorControls>

			 <div className={ className }>

                    { ! imgID ? (

                         <Fragment>
					<MediaUploadCheck>
	                        <MediaUpload
	                            onSelect={ onSelectImage }
	                            type="image"
	                            value={ imgID }
	                            render={ ( { open } ) => (
	                                <Button
	                                    className={ "button button-large" }
	                                    onClick={ open }
	                                >
	                                    { __( 'Upload Card Image', 'photo-card-modal' ) }
	                                </Button>
	                            ) }
	                        >
	                        </MediaUpload>
				    </MediaUploadCheck>

                        <TextControl
                            className='modal-card-title-input'
                            label={ 'Card Title' }
                            value={ cardTitle }
                            placeholder={ 'Card Title' }
                            onChange={ onChangeTitle }
                       />

                       <h4 className="modal-body-header">Modal (Pop-up) Body</h4>
                           <InnerBlocks />

                            </Fragment>

                    ) : (

                         <div className ={ className }>

                         { isSelected ? (

                            <div className ={ className + "-selected" } >

                                <img
                                   src={ imgURL }
                                   alt={ imgAlt }
                                   className = "card-selected-image"
                                />

                                 <MediaUploadCheck>
                                    <MediaUpload
                                         onSelect={ onSelectImage }
                                         type="image"
                                         value={ imgID }
                                         render={ ( { open } ) => (
                                             <Button
                                                className={ "button button-large" }
                                                onClick={ open }
                                             >
                                                { __( 'Change Card Image', 'photo-card-modal' ) }
                                             </Button>
                                         ) }
                                    >
                                    </MediaUpload>
                               </MediaUploadCheck>

                                <TextControl
                                    className='modal-card-title-input'
                                    label={ 'Card Title' }
                                    value={ cardTitle }
                                    placeholder={ 'Card Title' }
                                    onChange={ onChangeTitle }
                               />

                               <h4 className="modal-body-header">Modal (Pop-up) Body</h4>
                                   <InnerBlocks />

                                   </div>

                            ) : (

                                 <div className="clb-modal-card-static">
                                      <img
                                        src={ imgURL }
                                        alt={ imgAlt }
                                        className = "clb-modal-card-static-image"
                                     />
                                     <div className="modal-card-title-editor"><strong>{cardTitle}</strong></div>
                                     <div className="clb-modal-contents">
                                         <InnerBlocks />
                                    </div>
                                </div>

                            ) }

                            </div>

                    )}

                </div>
			 </Fragment>
            );
        },
        save: props => {
                    const { attributes: { imgID, imgURL, imgAlt, cardTitle, content, titleID } } = props;

                    return (
                         <div className="clb-modal-card-area">
                         <a href={'#' + titleID} data-toggle="modal">
                                 <img
                                    src={ imgURL }
                                    alt={ imgAlt }
                                 />
                                 <h3 className="modal-card-title-input">{cardTitle}</h3>
                           </a>

                                <div className="clb-custom-modal-move">
                                <div id={titleID} className="modal fade" tabindex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">

                                               <h4 className="modal-title">{cardTitle}</h4>
                                				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          			<span aria-hidden="true">×</span>
                                        			</button>
                                            </div>

                                            <div className="modal-body"><InnerBlocks.Content />{content}</div>
                                        </div>
                                    </div>
                                </div>
                                </div>

                           </div>
                    );
                },
    },
);
