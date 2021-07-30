import {
    Bar,
    ProductTable,
    ProductTableCircularGraph,
    ProductTableBarGraph,
    ProductTableTitle,
    DateSelector,
    ProductTableInformation,
} from '../Product.Table.Components';
import {determineColorByProduct} from '../../helpers';
import {shallow} from 'enzyme';

describe('<ProductTableBarGraph />', () => {
    [30, 60, 90].forEach((days, index) => {
        const productInformationThirtyDays = {
            scanDates: Array.from(Array(days).keys())
        }
        const productTableWrapper = shallow(
            <ProductTableBarGraph product={productInformationThirtyDays} />
        )
        it('Should return correct percentages', () => {
            const p = productTableWrapper.find('div').children().length
            expect(p).toBe(days);
        });
    });
});

describe('<Bar />', () => {
    const barWrapperEscapallle = shallow(<Bar percent={15} name={'Escapelle'}  />);
    const barWrapperMaliclean = shallow(<Bar percent={15} name={'Maliclean'}  />);
    const barWrapperSymbicole = shallow(<Bar percent={15} name={'Symbicole'}  />);
    it('Should be proper product color', () => {
        expect(barWrapperEscapallle.find('div').prop('style')).toHaveProperty('backgroundColor', '#2F6FFF');
        expect(barWrapperMaliclean.find('div').prop('style')).toHaveProperty('backgroundColor', '#772FFF');
        expect(barWrapperSymbicole.find('div').prop('style')).toHaveProperty('backgroundColor', '#E72FFF');
    });
})

// describe('<ProductTableCircularGraph />', () => {
//     it('expect data length to fail', () => {
//         const productTableWrapper = shallow(<ProductTableCircularGraph data={[1, 2, 3]} />);
//         expect(productTableWrapper.find("#dough-nut-chart").toBe(3))
//     })
// })