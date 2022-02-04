import React, { useState } from 'react'
import axios from 'axios'

import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'

const ReviewModal = ({ toggle, fetch, userID, store }) => {
  const [value, setValue] = useState(0)
  const [reviewBody, setReviewBody] = useState('')

  function submitReview() {
    event.preventDefault()
    var userObj = {
      'userId': userID,
      'storeId': store.id,
      'rating': value,
      'body': reviewBody,
    }
    axios
      .post(`/user/review`, userObj)
      .then(alert('Your review has been submitted, thank you!'))
      .then(res => fetch(store.id))
      .then(toggle)
  }

  function handleRatingChange(newRate) {
    setValue(newRate)
  }

  function handleBodyChange(e) {
    setReviewBody(e.target.value)
  }


  console.log('value::::', value)
  return (
    <div className="reviewModal">
      <div className="ModalTitle">{store.name}
        <span id="close" onClick={toggle}>X</span>

      </div>
      <form className="reviewModalBody" onSubmit={submitReview}>
        <div>
          <Rating
            name='simple-controlled'
            emptySymbol={<FaRegStar />}
            fullSymbol={<FaStar />}
            initialRating={value}
            onClick={newRate => handleRatingChange(newRate)}
          />
        </div>
        <div>
          <input type='text'
            maxLength='60'
            placeholder='Example: jackson11!'
            onChange={handleBodyChange}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default ReviewModal