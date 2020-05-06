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
    'cgb/icon-card-modal',
    {
        title: 'Icon Modal Card',
        description:  'Create an icon card with modal (pop up) content.',
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
               iconCardTitle: {
     			source: 'html',
     			selector: '.clb_card__title',
     			// default: __( 'Card Title' ),
     		},
               iconCardLink: {
                     type: 'string',
                     source: 'attribute',
                     attribute: 'href',
                     selector: 'a',
                 },
               backgroundColor: {
                   type: 'string',
                   default: '#555d66'
               },
               icon: {
                    type: 'string',
                    default: 'info-circle'
               },
               iconSize: {
                    type: 'string',
                    default: 'fa-4x'
               },
               iconStyle: {
                    type: 'string',
                    default: 'far'
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
            const { attributes: { iconCardTitle, iconCardLink, icon, iconSize, iconStyle, backgroundColor, titleID },
                className, setAttributes, isSelected } = props;

            const onChangeIconCardTitle = iconCardTitle => { setAttributes( { iconCardTitle } ) };
            const onChangeIconCardLink = iconCardLink => { setAttributes( { iconCardLink } ) };
            const onChangeIcon = icon => { setAttributes( { icon } ) };
            const onChangeIconSize = iconSize => { setAttributes( { iconSize } ) };
            const onChangeIconStyle = iconStyle => { setAttributes( { iconStyle } ) };

            function slugify(text) {

                if( !text ) { return ''; }
                   return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
                 }

            const setTitleID = titleID => { setAttributes( { titleID : slugify(iconCardTitle) } ) };
            setTitleID();

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Icon Card Settings', 'icon-card-regular' ) }
                   >
                   <TextControl
                       label={ 'Icon' }
                       help={ 'Copy the icon text from fontawesome.com/icons. Eg: lightbulb-on' }
                       value={ icon }
                       onChange={ onChangeIcon }
                   />
                   <SelectControl
                       label={ 'Icon Size' }
                       help={ 'Select the size of your icon. See: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons' }
                       value={ iconSize }
                       onChange={ onChangeIconSize }
                       options={[
                        { label: "Large", value: "fa-lg" },
                        { label: "2X", value: "fa-2x" },
                        { label: "3X", value: "fa-3x" },
                        { label: "4X", value: "fa-4x" },
                        { label: "5X", value: "fa-5x" },
                        { label: "6X", value: "fa-6x" },
                        { label: "7X", value: "fa-7x" },
                        { label: "8X", value: "fa-8x" },
                        { label: "9X", value: "fa-9x" },
                        { label: "10X", value: "fa-10x" },
                      ]}
                   />
                   <SelectControl
                       label={ 'Icon Style' }
                       help={ 'Select the style of your icon. See: https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use' }
                       value={ iconStyle }
                       onChange={ onChangeIconStyle }
                       options={[
                        { label: "Solid", value: "fas" },
                        { label: "Regular", value: "far" },
                        { label: "Light", value: "fal" },
                        { label: "Duotone", value: "fad" },
                        { label: "Brand", value: "fab" }
                      ]}
                   />
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
                            className='clb_card__title'
                            label={ 'Icon Card Title' }
                            value={ iconCardTitle }
                            placeholder={ 'Your Headline Here' }
                            onChange={ onChangeIconCardTitle }
                       />
                       <h4 className="modal-body-header">Modal (Pop-up) Body</h4>
                          <InnerBlocks />
                         </div>
                    ) : (

                       <div className="icon-card-regular-static" style={ { backgroundColor: backgroundColor } }>
                              <div className="clb-card-icon"><i className={ `${iconStyle} fa-${icon} ${iconSize}` }></i></div>
                              <strong>{iconCardTitle}</strong>
                              <div className="clb-modal-contents">
                              <h4 className="clb-modal-card-body-header">Modal (Pop-up) Body</h4>
                                 <InnerBlocks />
                                 </div>
                                </div>

                            ) }

                            </div>
                         </Fragment>
                    )},

        save: props => {

            const { iconCardTitle, iconCardLink, icon, iconSize, iconStyle, content, backgroundColor, titleID } = props.attributes;

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
                      <div className={ `icon-card-regular-area foreground-text-${getContrastYIQ(backgroundColor)}` } style={ { backgroundColor: backgroundColor } } >
                      <a href={'#' + titleID} data-toggle="modal">
                           <div className="clb-card-icon"><i className={ `${iconStyle} fa-${icon} ${iconSize}` }></i></div>
                           <h3 className="clb_card__title">{iconCardTitle}</h3>
                       </a>
                         </div>

                         <div className="clb-custom-modal-move">
                         <div id={titleID} className="modal fade" tabindex="-1" role="dialog">
                             <div className="modal-dialog" role="document">
                                 <div className="modal-content">
                                     <div className="modal-header">

                                        <h4 className="modal-title">{iconCardTitle}</h4>
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
