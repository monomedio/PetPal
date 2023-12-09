import {useCallback, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import {donatePet, getPet, getPetImage} from '../../api';
import "./index.css"

export default function Donate() {

    const [data, setData] = useState();
    const [images, setImages] = useState();
    const { id } = useParams();


    const getData = useCallback(async () => {
        const data = await getPet(id);
        const images = await getPetImage(id);
        setData(data)
        setImages(images)
    }, [id])

    async function submitForm(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const formData = new FormData(evt.target)
        console.log(formData.get('amount'))
        formData.set('pet_id', Number(id))
        if (formData.get('other-amount')) {
            formData.set('amount', formData.get('other-amount'))
            formData.delete('other-amount')
        }
        const credit_card = window.prompt('please entre the credit card');
        if (credit_card && /^\d+$/.test(credit_card)) {
            formData.set('credit_card', credit_card)
            donatePet(id, Object.fromEntries(formData.entries()))
                .then(res => {
                    console.log(res)
                    alert('thanks, donate success!');
                    evt.target.reset();
                }).catch(err => console.log(err))
        } else {
            window.alert('the credit card is error')
        }

    }

    useEffect(() => {
        getData();
    }, [getData])

    return <div className="container">
        <div className="pet-info">
            {
                data ? <>
                    <h3>{data.name}</h3>
                    <img src={images[0].image} alt="" className="pet-pic"/>
                </> : <h3>loading...</h3>
            }
        </div>
        <form className="donate-form" onSubmit={submitForm} >
            <h3>Frequency</h3>
            <div className="frequency">
                <input type="radio" name="frequency" id="one_time" value="one_time"></input>
                <label htmlFor="one_time">
                    One-time
                </label>
                <input type="radio" name="frequency" id="monthly" value="monthly"></input>
                <label htmlFor="monthly">
                    Monthly
                </label>
                <input type="radio" name="frequency" id="quarterly" value="quarterly"></input>
                <label htmlFor="quarterly">
                    Quarterly
                </label>
                <input type="radio" name="frequency" id="yearly" value="yearly"></input>
                <label htmlFor="yearly">
                    Yearly
                </label>
            </div>
            <h3>Amount</h3>

            <div className="amount">

                <input type="radio" name="amount" id="amount25" value="25"></input>
                <label htmlFor="amount25">
                    $25
                </label>
                <input type="radio" name="amount" id="amount75" value="75"></input>
                <label htmlFor="amount75">
                    $75
                </label>
                <input type="radio" name="amount" id="amount100" value="100"></input>
                <label htmlFor="amount100">
                    $100
                </label>
                <input type="radio" name="amount" id="amount200" value="200"></input>
                <label htmlFor="amount200">
                    $200
                </label>
                <input type="radio" name="amount" id="amount300" value="300"></input>
                <label htmlFor="amount300">
                    $300
                </label>
                <input type="radio" name="amount" id="amount500" value="500"></input>
                <label htmlFor="amount500">
                    $500
                </label>
            </div>
            <div className="other">
                <span>Other Amount: </span>

                <input type="number" name="other-amount"/>
            </div>
            <div className="comment">
                <h3>Add Comment</h3>
                <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
            </div>

            <div className="submit">
                <button>Submit</button>
            </div>
        </form>

    </div>
}