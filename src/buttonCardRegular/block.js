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
    'cgb/button-card-regular',
    {
        title: __( 'Button (Button Grid Only)', 'clbbuttoncardregular' ),
        description: __( 'Add a button to your grid ', 'clbbuttoncardregular'),
        category: 'custom-cards',
        //parent: ['cgb/button-grid'],
	   icon: {
             foreground: '#fff',
	        background: '#3883d6',
	        src: 'admin-links',
	   },
        keywords: [ __( 'button' ), __( 'link' ), __( 'image' ) ],
        attributes: {
          buttonText: {
			source: 'html',
			selector: '.clb-button__text',
			// default: __( 'Card Title' ),
		},
          buttonLink: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
          backgroundColor: {
              type: 'string',
              default: '#333'
          },
        },
        edit: props => {
            const { attributes: { buttonText, buttonLink, backgroundColor, uniqueID },
                className, setAttributes, isSelected } = props;

            const onChangeButtonText = buttonText => { setAttributes( { buttonText } ) };
            const onChangeButtonLink = buttonLink => { setAttributes( { buttonLink } ) };

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
                       <URLInput
                               className="clb-button__link"
                               value={ buttonLink }
                               onChange = { onChangeButtonLink }
                           />
                         </div>
                    ) : (

                       <div className="clb-button-static" style={ { backgroundColor: backgroundColor } } >
                           <strong>{buttonText}</strong>
                      </div>

                            ) }

                            </div>
                         </Fragment>
                    )},

        save: props => {

            const { buttonText, buttonLink, backgroundColor, uniqueID } = props.attributes;

            return (

                 <div className="clb-button-area">
                      <a href={buttonLink} className="button full clb-button" style={ { backgroundColor: backgroundColor } }>
                               <div className="clb-button__text">{buttonText}</div>
                         </a>
                    </div>

            );
        },
    },
);
