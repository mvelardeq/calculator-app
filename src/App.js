import { useState } from "react";

function App() {

  const [theme, setTheme] = useState('th1')
  
  const onChangeTheme = ({target})=>{
    switch (target.id) {
      case 'pointTheme1':
        setTheme('th1')
        break;
      case 'pointTheme2':
        setTheme('th2')
        break;
      case 'pointTheme3':
        setTheme('th3')
        break;
    
      default:
        break;
    }
  }

  const listOfNumbers= (string)=>{
    const list = string.split(/(\d[^\+\x\-\/\*]*)+/g)
    list.shift()
    list.pop()
    return list
  }
  const getTheLastNumber=(string)=>{
    const list = listOfNumbers(string)
    return list[list.length-1]
  }
  
  const [calOperation, setCalOperation] = useState('')

  const onPressKey = ({target})=>{

    if(calOperation==='' && target.textContent==='.'){
      setCalOperation('0.')
    }
    if(isNaN(target.textContent) && isNaN(calOperation.at(calOperation.length-1))){
      return
    }
    if(target.textContent==='.' && !getTheLastNumber(calOperation).includes('.')){
      setCalOperation(calOperation+target.textContent)
    }
    if(target.textContent!=='.'){
      if(target.textContent==='0' && getTheLastNumber(calOperation)==='0'){
        return
      }else if(calOperation==='0'){
        setCalOperation(target.textContent)
    }else{
        setCalOperation(calOperation+target.textContent)
      }
    }
    
  }

  const onPressDelKey = ()=>{
    setCalOperation(current=>{
      return current.substring(0,current.length-1)
    })
  }

  const onPressResetKey = ()=>{
    setCalOperation('')
  }

  
  const arr =listOfNumbers(calOperation)
  const list = arr.map(el=>(!isNaN(el))?parseFloat(el):el)
  
  const onPressEqualKey =()=>{
    if(list.length===1){
      console.log(list)
      return setCalOperation(list+'')
    }else{
      if(list.indexOf('/')!==-1){
        list[list.indexOf('/')-1] /= list[list.indexOf('/')+1]
        list.splice(list.indexOf('/')+1,1)
        list.splice(list.indexOf('/'),1)
        console.log(list,'/')
        return onPressEqualKey()
      }else if(list.indexOf('x')!==-1){
        list[list.indexOf('x')-1] *= list[list.indexOf('x')+1]
        list.splice(list.indexOf('x')+1,1)
        list.splice(list.indexOf('x'),1)
        console.log(list,'x')
        return onPressEqualKey()
      }else if(list.indexOf('-')!==-1){
        list[list.indexOf('-')-1] -= list[list.indexOf('-')+1]
        list.splice(list.indexOf('-')+1,1)
        list.splice(list.indexOf('-'),1)
        console.log(list,'res')
        return onPressEqualKey()
      }else if(list.indexOf('+')!==-1){
        list[list.indexOf('+')-1] += list[list.indexOf('+')+1]
        list.splice(list.indexOf('+')+1,1)
        list.splice(list.indexOf('+'),1)
        console.log(list,'sum')
        return onPressEqualKey()
      }
    }
  }

  return (
    <>
      <main className={`main ${theme}`}>
        <div className="calculatorContainer">
          <div className={`topSection ${theme}`}>
            <div className={`title ${theme}`}>calc</div>
            <div className={`themeSection ${theme}`}>
              <div className={`numbersTheme ${theme}`}>
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
              <div className={`titleTheme ${theme}`}>THEME</div>
              <div className={`actionTheme ${theme}`}>
                <div onClick={onChangeTheme} className={(theme==='th1')?'point show th1':'point' } id="pointTheme1"></div>
                <div onClick={onChangeTheme} className={(theme==='th2')?'point show th2':'point' } id="pointTheme2"></div>
                <div onClick={onChangeTheme} className={(theme==='th3')?'point show th3':'point' } id="pointTheme3"></div>
              </div>
            </div>
          </div>
          <div className={`screenSection ${theme}`}>
            <div className="textScreen">
              <p>{(calOperation.length===0)?'0':calOperation}</p>
            </div>
          </div>
          <div className={`keySection ${theme}`}>
            <div className={`key ${theme}`} onClick={onPressKey}>7</div>
            <div className={`key ${theme}`} onClick={onPressKey}>8</div>
            <div className={`key ${theme}`} onClick={onPressKey}>9</div>
            <div className={`key del ${theme}`} onClick={onPressDelKey}>DEL</div>
            <div className={`key ${theme}`} onClick={onPressKey}>4</div>
            <div className={`key ${theme}`} onClick={onPressKey}>5</div>
            <div className={`key ${theme}`} onClick={onPressKey}>6</div>
            <div className={`key ${theme}`} onClick={onPressKey}>+</div>
            <div className={`key ${theme}`} onClick={onPressKey}>1</div>
            <div className={`key ${theme}`} onClick={onPressKey}>2</div>
            <div className={`key ${theme}`} onClick={onPressKey}>3</div>
            <div className={`key ${theme}`} onClick={onPressKey}>-</div>
            <div className={`key ${theme}`} onClick={onPressKey}>.</div>
            <div className={`key ${theme}`} onClick={onPressKey}>0</div>
            <div className={`key ${theme}`} onClick={onPressKey}>/</div>
            <div className={`key ${theme}`} onClick={onPressKey}>x</div>
            <div className={`key reset ${theme}`} onClick={onPressResetKey}>RESET</div>
            <div className={`key equal ${theme}`} onClick={onPressEqualKey}>=</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
