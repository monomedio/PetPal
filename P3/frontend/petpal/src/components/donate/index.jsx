// import {useCallback, useEffect, useState} from 'react';
// import { useParams } from 'react-router-dom'
import {donatePet} from '../../api';
import "./index.css"
import dog from '../../images/dog.jpg'
export default function Donate() {

    // const [data, setData] = useState();
    // const [images, setImages] = useState();
    // const { id } = useParams();


    // const getData = useCallback(async () => {
    //     const data = await getPet(id);
    //     const images = await getPetImage(id);
    //     setData(data)
    //     setImages(images)
    // }, [id])

    async function submitForm(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const formData = new FormData(evt.target)
        // formData.set('pet_id', Number(id))
        if (formData.get('other-amount')) {
            if (isNaN(Number(formData.get('other-amount'))) || Number(formData.get('other-amount')) < 0) {
                alert('other amount error')
                return;
            }
            formData.set('amount', formData.get('other-amount'))
            formData.delete('other-amount')
        }
        if (!formData.get('frequency') || !formData.get('amount')) {
            return;
        }
        const credit_card = window.prompt('please entre the credit card');
        if (credit_card && /^\d{16}$/.test(credit_card)) {
            formData.set('credit_card', credit_card)
            donatePet(Object.fromEntries(formData.entries()))
                .then(res => {
                    console.log(res)
                    alert('thanks, donate success!');
                    evt.target.reset();
                }).catch(err => console.log(err))
        } else {
            window.alert('the credit card is error')
        }

    }

    // useEffect(() => {
    //     getData();
    // }, [getData])

    return <div className="container">
        <div className="pet-info">
            <h3>DONATE</h3>
            <img src={dog} alt="" className="pet-pic"/>
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