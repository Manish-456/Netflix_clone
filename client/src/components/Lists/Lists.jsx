import './lists.scss'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItems from '../ListItems/ListItems';
import { useRef,  useState } from 'react';

const Lists = ({list}) => {
  
 const [slideNumber , setSlideNumber] = useState(0)
 const [isMoved , setIsMoved] = useState(false)
 const [clickLimit , setClickLimit] = useState(window.innerWidth / 230)
 const elRef = useRef()
 const clickHandler = (direction) => {
 let distance = elRef.current.getBoundingClientRect().x - 50
 console.log(distance)
 setIsMoved(true)
  if(direction === "left" && slideNumber > 0){
   setSlideNumber(slideNumber - 1)
   elRef.current.style.transform = `translate(${220 + distance}px)`
  }if(direction === "right" && slideNumber < 10 - clickLimit){
   setSlideNumber(slideNumber  + 1)
   elRef.current.style.transform = `translate(${-220 + distance}px)`
  }
 }

  return (
    <div className='lists'>
     <div className="listTitle">{list?.title}</div>
     <div className="wrapper">
      <ArrowBackIosIcon
      style={{
       display : !isMoved && 'none'
      }}
      className='arrow left' onClick={() => clickHandler("left")} />
      <div className="container"  ref={elRef}>
      {list?.content.map((item, index) => {
        return  <ListItems key={index} index={index} item={item} />
      })}
  
      
      </div>
      <ArrowForwardIosIcon className='arrow right' onClick={() => clickHandler("right")} />
     </div>
      
    </div>
  )
}

export default Lists
