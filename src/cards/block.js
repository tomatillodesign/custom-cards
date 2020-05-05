/**
 * Block dependencies
 */
import icon from './icon';
import './editor.scss';
import './style.scss';

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
    BlockAlignmentToolbar,
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
    RangeControl,
    ToggleControl,
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-custom-cards', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Custom Cards' ), // Block title.
	icon: {
               foreground: '#0d72c7',
               background: '#fff',
               src: icon,
          },
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Custom Cards' ),
		__( 'modal' ),
		__( 'collapse bootstrap image card' ),
	],
     attributes: {
          blockAlignment: {
            type: 'string',
            default: 'center',
        },
          cardType: {
              type: 'string',
              default: 'photos',
          },
          isModal: {
               type: 'string',
               default: 'regular',
          },
          columnNumber: {
                type: 'number',
                default: 2,
            },
        },
        getEditWrapperProps( { blockAlignment } ) {
            if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */

      edit: props => {
            const { attributes: { blockAlignment, cardType, columnNumber, isModal },
                className, setAttributes, isSelected } = props;

                const onChangeCardType = cardType => { setAttributes( { cardType } ) };
                const onChangeIsModal = isModal => { setAttributes( { isModal } ) };
                const onChangeColumnNumber = columnNumber => { setAttributes( { columnNumber } ) };

                // setup some vars, strings
                let cardTypeToDisplay = "Photos";
                if( cardType === 'icons' ) { cardTypeToDisplay = "Icons"; }
                else if( cardType === 'buttons' ) { cardTypeToDisplay = "Buttons"; }

                // setup the InnerBlocks that we'll be using, based on the selected choice
                let ALLOWED_BLOCKS = [ 'cgb/photo-card-regular' ];
                if( cardType === 'icons' && isModal === 'regular' ) { ALLOWED_BLOCKS = [ 'cgb/icon-card-regular' ]; }
                if( cardType === 'buttons' && isModal === 'regular' ) { ALLOWED_BLOCKS = [ 'cgb/button-card-regular' ]; }
                if( cardType === 'photos' && isModal === 'modal' ) { ALLOWED_BLOCKS = [ 'cgb/photo-card-modal' ]; cardTypeToDisplay = "Photos (Modal)"; }
                if( cardType === 'icons' && isModal === 'modal' ) { ALLOWED_BLOCKS = [ 'cgb/icon-card-modal' ]; cardTypeToDisplay = "Icons (Modal)"; }
                if( cardType === 'buttons' && isModal === 'modal' ) { ALLOWED_BLOCKS = [ 'cgb/photo-card-modal' ]; cardTypeToDisplay = "Buttons (Modal)"; }

                console.log("421 TEST");
                const clbAlignment = "align" + blockAlignment;

            return (
                 <Fragment>
                 <BlockControls>
                      <BlockAlignmentToolbar
                           value={ blockAlignment }
                           onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                       />
                    </BlockControls>

                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Custom Cards Settings', 'cgb/block-custom-cards' ) }
                   >
                         <PanelRow>
                         <SelectControl
                              id="clb-select-card-type"
                              label="Card Type"
                              value={ cardType }
                              options={ [
                                   { label: 'Photos', value: 'photos' },
                                   { label: 'Icons', value: 'icons' },
                                   { label: 'Buttons', value: 'buttons' },
                              ] }
                              onChange={ onChangeCardType }
                         />
                         </PanelRow>
                       <PanelRow>
                       <RangeControl
                            id="clb-select-number-cols"
                            label="Number of Columns"
                            value={ columnNumber }
                            onChange={ onChangeColumnNumber }
                            min={ 1 }
                            max={ 6 }
                        />
                       </PanelRow>
                            <RadioControl
                              id="clb-select-type-of-links"
                              label="Type of Links"
                                 selected={ isModal }
                                 options={ [
                                     { label: 'Regular Links to Another Page', value: 'regular' },
                                     { label: 'Modal (Pop-up) Content', value: 'modal' },
                                ] }
                                onChange={ onChangeIsModal }
                          />
                       <PanelRow>
                        </PanelRow>
                   </PanelBody>
               </InspectorControls>

               <div className={ className + ' ' + clbAlignment }>

               { isSelected ? (

                    <div className="cardset-selected">
                    <h4>Custom Cards: {cardTypeToDisplay}</h4>
                         <InnerBlocks
                              allowedBlocks={ ALLOWED_BLOCKS }
                         />
                    </div>

                            ) : (

                                 <div className="cardset-static">
                                        <h4>Custom Cards: {cardTypeToDisplay}</h4>
                                             <InnerBlocks
                                                  allowedBlocks={ ALLOWED_BLOCKS }
                                             />
                                </div>

                            ) }
                </div>
                </Fragment>

            );
        },
        save: props => {
            const { blockAlignment, cardType, columnNumber, isModal } = props.attributes;

            const clbAlignment = "align" + blockAlignment;

            return (

                 // Try nesting a style for child flip cards, see: https://stackoverflow.com/a/10833154/5369381

                 <div className={ 'interactive-cardset' + ' columns-' + columnNumber + ' ' + clbAlignment} data-card-type={cardType} data-columns={columnNumber} data-is-modal={isModal} >
                    <InnerBlocks.Content />
                </div>

            );
        },

} );
