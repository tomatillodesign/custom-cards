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
    PanelColorSettings,
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
    'cgb/button-card-modal',
    {
        title: 'Button Modal',
        description:  'Create a button with modal (pop up) content.',
        category: 'custom-cards',
        icon: {
               foreground: '#fff',
               background: '#3883d6',
            src: icon,
        },
        keywords: [
            'modal',
            'pop up',
            'button'
        ],
        attributes: {
             buttonText: {
                  source: 'html',
                  selector: '.clb-button__text',
                  // default: __( 'Card Title' ),
             },
               backgroundColor: {
                   type: 'string',
                   default: '#555d66'
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
            const { attributes: { buttonText, backgroundColor, content, titleID },
                className, setAttributes, isSelected } = props;

            const onChangeButtonText = buttonText => { setAttributes( { buttonText } ) };

            ////////// HELPERS ///////////////////////
            function slugify(text) {

                if( !text ) { return ''; }
                   return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
                 }


            function getContrastYIQ(hexcolor){

                   var r = parseInt(hexcolor.substr(1,2),16);
                   var g = parseInt(hexcolor.substr(3,2),16);
                   var b = parseInt(hexcolor.substr(5,2),16);
                   var yiq = ((r*299)+(g*587)+(b*114))/1000;
                   return (yiq >= 128) ? 'dark' : 'light';
               }
          ////////// END HELPERS ///////////////////////


            const setTitleID = titleID => { setAttributes( { titleID : slugify(buttonText) } ) };
            setTitleID();

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Button Settings', 'clbbuttoncardregular' ) }
                   >
                       <PanelRow>
                            <PanelColorSettings
                            title={'Background Color'}
                            colorSettings={[
                              {
                               label: "Color Picker",
                               value: backgroundColor,
                               onChange: backgroundColor => {
                                  setAttributes({ backgroundColor });
                               }
                              }
                            ]}
                         />
                       </PanelRow>
                   </PanelBody>
               </InspectorControls>

               <div className={ className } >
               { isSelected ? (

                    <div className ={ className + "-selected" } >
                         <TextControl
                             className='clb-button__text'
                             label={ 'Button Text' }
                             value={ buttonText }
                             placeholder={ 'Learn More' }
                             onChange={ onChangeButtonText }
                        />
                       <h4 className="modal-body-header">Modal (Pop-up) Body</h4>
                         <div className="clb-modal-contents">
                              <InnerBlocks />
                         </div>
                         </div>
                    ) : (

                         <div className={ `clb-button-static foreground-text-${getContrastYIQ(backgroundColor)}` } style={ { backgroundColor: backgroundColor } }>
                              <strong>{buttonText}</strong>
                              <div className="clb-modal-contents">
                                  <InnerBlocks />
                             </div>
                        </div>

                            ) }

                            </div>
                         </Fragment>
                    )},

        save: props => {

            const { buttonText, backgroundColor, content, titleID } = props.attributes;

            function getContrastYIQ(hexcolor){

                   var r = parseInt(hexcolor.substr(1,2),16);
                   var g = parseInt(hexcolor.substr(3,2),16);
                   var b = parseInt(hexcolor.substr(5,2),16);
                   var yiq = ((r*299)+(g*587)+(b*114))/1000;
                   return (yiq >= 128) ? 'dark' : 'light';
               }

            return (

                 <Fragment>
                 <div className="clb-modal-card-area">

                         <div className="clb-button-area" >
                              <a href={'#' + titleID} data-toggle="modal" className={`button full clb-button foreground-text-${getContrastYIQ(backgroundColor)}` } style={ { backgroundColor: backgroundColor } }>
                                       <div className="clb-button__text">{buttonText}</div>
                                 </a>
                            </div>

                         <div className="clb-custom-modal-move">
                         <div id={titleID} className="modal fade" tabindex="-1" role="dialog">
                             <div className="modal-dialog" role="document">
                                 <div className="modal-content">
                                     <div className="modal-header">

                                        <h4 className="modal-title">{buttonText}</h4>
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
                    </Fragment>

            );
        },
    },
);
