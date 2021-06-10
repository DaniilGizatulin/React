//import React, { useState } from 'react'

//import './dragDrop.sass';

//const DragDrop = () => {
//    let ord = 1
//    const [cardList, setCardList] = useState(postOnPage.map(c => {
//        return { ...c, order: ord++ }
//    }))
//    useEffect(() => {
//        if (cardList.length === 0) {
//            setCardList(postOnPage.map(c => {
//                return { ...c, order: ord++ }
//            }))
//        }
//    }, [postOnPage, cardList, ord])
//    const [currentCard, setCurrentCard] = useState(null)
//    const dragStartHandler = (e, card) => {
//        setCurrentCard(card)
//        console.log('drag', card)
//    }
//    const dragEndHandler = (e) => {
//        e.target.style.background = '#392e5c'
//    }
//    const dragOverHandler = (e) => {
//        e.preventDefault()
//        e.target.style.background = '#392e5c'
//    }
//    const dropHandler = (e, card) => {
//        e.preventDefault()
//        console.log('drop', card)
//        setCardList(cardList.map((c) => {
//            if (c._id === card._id) {
//                return { ...c, order: currentCard.order }
//            }
//            if (c._id === currentCard._id) {
//                return { ...c, order: card.order }
//            }
//            return c
//        }))
//        e.target.style.background = '#392e5c'
//    }

//    const sortCard = (a, b) => {
//        if (a.order > b.order) {
//            return 1
//        } else {
//            return -1
//        }
//    }

//    const postList = cardList.sort(sortCard).map((postItem, i) => {
//        idx++

//        return (
//            <div className="post" key={idx} onClick={() => console.log(postItem)}>
//                <div
//                    onDragStart={(e) => dragStartHandler(e, postItem)}
//                    onDragLeave={(e) => dragEndHandler(e)}
//                    onDragEnd={(e) => dragEndHandler(e)}
//                    onDragOver={(e) => dragOverHandler(e)}
//                    onDrop={(e) => dropHandler(e, postItem)}
//                    className="post-list-item"
//                    draggable={true}>
//                    <div className="cards">
//                        <p className="title">{postItem.title}</p>
//                        <ul className="full-text">{postItem.description}</ul>
//                        <div className="full-post">
//                            <button
//                                className='view'
//                                onClick={() => navHistory(`/post/${postItem._id}`)}>
//                                View
//                            </button>
//                        </div>
//                    </div>
//                </div>
//            </div>

//        )
//    })
//}

//export default DragDrop