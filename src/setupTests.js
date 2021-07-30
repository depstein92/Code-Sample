import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

window.URL.createObjectURL = function() {}; 
//createUrlObject on object window is undefined;
//This is a workaround
require('jest-canvas-mock');
// helps jest deal with Canvas Elements


configure({ adapter: new Adapter() });