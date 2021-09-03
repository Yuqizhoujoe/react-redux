import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    {
        id: 'p1',
        price: 100,
        title: 'React',
        description: 'React No.1'
    },
    {
        id: 'p2',
        price: 90,
        title: 'Node.JS',
        description: 'Node.js yeayea'
    }
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_PRODUCTS.map(product => {
                    return (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                        />
                    );
                })}
            </ul>
        </section>
    );
};

export default Products;
