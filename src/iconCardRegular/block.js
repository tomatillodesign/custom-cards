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
    'cgb/icon-card-regular',
    {
        title: __( 'Icon Card', 'icon-card-regular' ),
        description: __( 'Add an icon card to your grid ', 'icon-card-regular'),
        category: 'custom-cards',
        // parent: ['cgb/block-custom-cards'],
	   icon: {
             foreground: '#555d66',
	        background: 'transparent',
	        src: 'media-video',
	   },
        keywords: [ __( 'icon' ), __( 'card' ), __( 'grid' ) ],
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
               default: '4x'
          },
          iconStyle: {
               type: 'string',
               default: 'far'
          },
        },
        edit: props => {
            const { attributes: { iconCardTitle, iconCardLink, icon, iconSize, iconStyle, backgroundColor },
                className, setAttributes, isSelected } = props;

            const onChangeIconCardTitle = iconCardTitle => { setAttributes( { iconCardTitle } ) };
            const onChangeIconCardLink = iconCardLink => { setAttributes( { iconCardLink } ) };
            const onChangeIcon = icon => { setAttributes( { icon } ) };
            const onChangeIconSize = iconSize => { setAttributes( { iconSize } ) };
            const onChangeIconStyle = iconStyle => { setAttributes( { iconStyle } ) };

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
                   <TextControl
                       label={ 'Icon Size' }
                       help={ 'Select the size of your icon. See: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons' }
                       value={ iconSize }
                       onChange={ onChangeIconSize }
                   />
                   <SelectControl
                       label={ 'Icon Style' }
                       help={ 'Select the size of your icon. See: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons' }
                       value={ iconStyle }
                       onChange={ onChangeIconStyle }
                       options={[
                        { label: "Solid", value: "fas" },
                        { label: "Regular", value: "far" },
                        { label: "Light", value: "fal" },
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
                       <URLInput
                               className="icon-card-regular__link"
                               value={ iconCardLink }
                               onChange = { onChangeIconCardLink }
                           />
                         </div>
                    ) : (

                       <div className="icon-card-regular-static" style={ { backgroundColor: backgroundColor } }>
                           <strong>{iconCardTitle}</strong>
                      </div>

                            ) }

                            </div>
                         </Fragment>
                    )},

        save: props => {

            const { iconCardTitle, iconCardLink, icon, iconSize, iconStyle, backgroundColor } = props.attributes;

            function getContrastYIQ(hexcolor){

                   var r = parseInt(hexcolor.substr(1,2),16);
                   var g = parseInt(hexcolor.substr(3,2),16);
                   var b = parseInt(hexcolor.substr(5,2),16);
                   var yiq = ((r*299)+(g*587)+(b*114))/1000;
                   return (yiq >= 128) ? 'dark' : 'light';
               }

            return (

                 <div className={ `icon-card-regular-area foreground-text-${getContrastYIQ(backgroundColor)}` } style={ { backgroundColor: backgroundColor } } >
                      <a href={iconCardLink} className="icon-card-regular-link">
                               <div className="clb-card-icon"><i className={ `${iconStyle} fa-${icon} fa-${iconSize}` }></i></div>
                               <h3 className="clb_card__title">{iconCardTitle}</h3>
                         </a>
                    </div>

            );
        },
    },
);
