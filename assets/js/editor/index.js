import { registerPlugin } from '@wordpress/plugins';
import MetaBox from './components/dubco-side-panel';

registerPlugin('dubco-side-panel', {
	render: MetaBox,
});
