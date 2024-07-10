import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import UserLayout from "../Layouts/UserLayout";


const SingleStocksPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("stocks")
            .get(urlParams.singleStocksId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"product"] }})
            .then((res) => {
                set_entity(res || {});
                const product = Array.isArray(res.product)
            ? res.product.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.product
                ? [{ _id: res.product._id, name: res.product.name }]
                : [];
        setProduct(product);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Stocks", type: "error", message: error.message || "Failed get stocks" });
            });
    }, [props,urlParams.singleStocksId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <UserLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Stocks</h3>
                </div>
                <p>stocks/{urlParams.singleStocksId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Qty</label><p className="m-0 ml-3" >{_entity?.qty}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Stockdate</label><p className="m-0 ml-3" >{_entity?.stockdate}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">product</label>
            <p>{product.map((elem) => (
                    <Link key={elem._id} to={`/products/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>

            <div className="col-12">&nbsp;</div>
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">created</label>
                <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">updated</label>
                <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">createdBy</label>
                <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">lastUpdatedBy</label>
                <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
            </div>

                </div>
            </div>
        </div>
        
        </UserLayout>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleStocksPage);
