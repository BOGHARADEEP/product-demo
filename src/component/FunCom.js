import { useEffect, useState } from 'react'
import loader from "../assets/image/loading.gif"
import { useNavigate } from 'react-router-dom'
import "../assets/css/Home.css"



function FunCom() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState()
    // const formValueReset = {
    //     title: '',
    //     brand: '',
    //     category: '',
    //     description: '',
    //     discountPercentage: '',
    //     price: '',
    //     rating: '',
    //     stock: '',
    //     thumbnail: ''
    // }
    // const [formData, setFormData] = useState(formValueReset);
    // const [errorFormData, setErrorFormData] = useState({
    //     title: '',
    //     brand: '',
    //     category: '',
    //     description: '',
    //     discountPercentage: '',
    //     price: '',
    //     rating: '',
    //     stock: '',
    //     thumbnail: ''
    // });

    useEffect(() => {
        getProductData()
    }, [])
    const getProductData = async () => {
        try {
            setLoading(true)
            let response = await fetch('https://dummyjson.com/products')
            let data = await response.json()
            if (data && data?.products?.length > 0) {
                setProduct(data)
            } else {
                setProduct(null)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleDelete = async (id) => {
        try {
            let response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            });
            let data = await response.json();
            console.log(data);

            const newProducts = product;
            const idx = newProducts?.products?.findIndex((product) => product.id === id);
            if (idx > -1) {
                newProducts.products.splice(idx, 1);
                console.log({ product, newProducts });
            }
            setProduct({ ...newProducts });
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleEdit = async (id) => {
        // console.log(id); 
        navigate(`/fun-com/${id}`)

    }
    const newAddData = async (add) => {
        // alert("newAddData")
        navigate(`/fun-com/new/${add}`)
    }
    return (
        <div>
            <button style={{ padding: '5px 55px', margin: '2px', backgroundColor: 'yellowgreen' }} onClick={newAddData}>Add Data</button>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>DiscountPercentage</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Stock</th>
                        <th>Title</th>
                        <th>Images</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        <img src={loader} />
                        : ((product && product?.products?.length > 0) ?
                            product?.products?.map((p, i) => (
                                <tr key={i}>
                                    <td>{p?.id}</td>
                                    <td>{p?.brand}</td>
                                    <td>{p?.category}</td>
                                    <td>{p?.description}</td>
                                    <td>{p?.discountPercentage}</td>
                                    <td>{p?.price}</td>
                                    <td>{p?.rating}</td>
                                    <td>{p?.stock}</td>
                                    <td>{p?.title}</td>
                                    <td><img src={p?.thumbnail} alt="thumbnail" height={50} /></td>
                                    <td>
                                        <button onClick={() => handleEdit(p?.id)}>Edit</button>
                                        <button onClick={() => handleDelete(p?.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={11}>No Data Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


export default FunCom;