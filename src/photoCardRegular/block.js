/**
 * Block dependencies
 */
import icons from './icons';
import './editor.scss';
import './style.css';

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
    'cgb/photo-card-regular',
    {
        title: __( 'Photo Card - Regular', 'clbphotocardregular' ),
        description: __( 'Add interactive photo cards to your content ', 'clbphotocardregular'),
        category: 'custom-cards',
        // parent: ['cgb/block-custom-cards'],
	   icon: {
	        foreground: '#fff',
	        background: '#3883d6',
	        src: 'images-alt2',
	   },
        keywords: [ __( 'card' ), __( 'flip' ), __( 'image' ) ],
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
           cardType: {
 			type: 'string',
 			default: 'basic',
 		},
          cardTitle: {
			source: 'html',
			selector: '.clb-card__title',
			// default: __( 'Card Title' ),
		},
          includeCardDescription: {
               type: 'string',
               default: 'no',
          },
          cardDescription: {
               type: 'array',
               source: 'children',
               selector: '.clb-card__description',
		},
          cardLink: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
          buttonText: {
               source: 'html',
               selector: '.clb-card__button-text',
               default: 'Learn More',
          },
        },
        edit: props => {
            const { attributes: { imgID, imgURL, imgAlt, cardType, cardTitle, cardLink, includeCardDescription, cardDescription, buttonText },
                className, setAttributes, isSelected } = props;
            const onSelectImage = img => {

                 // if WP's "large" image size exists, use that. If not, use the "Full" image size
                 let imgURL = img.sizes.large ? img.sizes.large.url : img.url;

                setAttributes( {
                    imgID: img.id,
                    imgURL: imgURL,
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

            const onChangeCardType = cardType => { setAttributes( { cardType } ) };
            const onChangeTitle = cardTitle => { setAttributes( { cardTitle } ) };
            const onChangeBody = cardBody => { setAttributes( { cardBody } ) };
            const onChangeButtonText = buttonText => { setAttributes( { buttonText } ) };
            const onChangeIncludeCardDescription = includeCardDescription => { setAttributes( { includeCardDescription } ) };
            const onChangeCardDescription = cardDescription => { setAttributes( { cardDescription } ) };

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Card Settings', 'clbphotocardregular' ) }
                   >
                       <PanelRow>
                            <RadioControl
                              id="clb-select-card-description"
                              label="Include card description field?"
                                 selected={ includeCardDescription }
                                 options={ [
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' },
                               ] }
                               onChange={ onChangeIncludeCardDescription }
                         />
                       </PanelRow>
                   </PanelBody>
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
	                                    { __( 'Upload Card Image', 'clbphotocardregular' ) }
	                                </Button>
	                            ) }
	                        >
	                        </MediaUpload>
				    </MediaUploadCheck>

                        <TextControl
                            className='clb-card__title'
                            label={ 'Card Title' }
                            value={ cardTitle }
                            placeholder={ 'Card Title' }
                            onChange={ onChangeTitle }
                       />
                       <URLInput
                               className="clb-card__link"
                               value={ cardLink }
                               onChange={ cardLink => setAttributes( { cardLink } ) }
                           />
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
                                                { __( 'Change Card Image', 'clbphotocardregular' ) }
                                             </Button>
                                         ) }
                                    >
                                    </MediaUpload>
                               </MediaUploadCheck>

                                <TextControl
                                    className='clb-card__title'
                                    label={ 'Card Title' }
                                    value={ cardTitle }
                                    placeholder={ 'Card Title' }
                                    onChange={ onChangeTitle }
                               />
                               { includeCardDescription === 'yes' &&
                                   <div className="clb-card__description">
                                    <RichText
                                       tagName="div"
                                       multiline="p"
                                       placeholder='Add the card description here...'
                                 		onChange={ onChangeCardDescription }
                                 		value={ cardDescription }
                             		/>
                                   </div>
                              }
                               <URLInput
                                       className="clb-card__link"
                                       value={ cardLink }
                                       onChange={ cardLink => setAttributes( { cardLink } ) }
                                   />
                                   </div>

                            ) : (

                                 <div className="clb-card-static">
                                      <img
                                        src={ imgURL }
                                        alt={ imgAlt }
                                        className = "card-static-image"
                                     />
                                     <strong>{cardTitle}</strong>
                                </div>

                            ) }

                            </div>

                    )}

                </div>
			 </Fragment>
            );
        },
        save: props => {
            const { imgID, imgURL, imgAlt, cardType, cardTitle, cardLink, includeCardDescription, cardDescription, buttonText } = props.attributes;

            return (

                 <div className={"interactive-card" + ' card-' + cardType}>

                 <a href={cardLink}>
                         <img
                            src={ imgURL }
                            alt={ imgAlt }
                         />
                         <h3 className="clb-card__title">{cardTitle}</h3>
                         { includeCardDescription === 'yes' &&
                              <div className="clb-card__description">
                                   {cardDescription}
                              </div>
                         }
                   </a>

                </div>
            );
        },
    },
);
