import { useEffect, useState } from "react";
import {highLight, convertNewLinesToBr, createMarkup, convertUrlToLink} from "./functions";
import data from "./data";



function App() {
  const [search, setSearch] = useState('');
  const [dataList, setDataList] = useState(data);
  const [currentQstId, setCurrentQstId] = useState(0);

  const qsts = dataList.map(
    item => <li 
              key={ item.id } 
              className={`${'qst-item'} ${item.id === currentQstId ? 'qst-item-active' : ''}`}
              onClick={() => setCurrentQstId(item.id) }
            >
              { `${item.id}. ${item.qst}` }
            </li>);

  const getAnsw = (id) => {
    const data = dataList.find(item => item.id === id);
    return data ? highLight({filter: search, str:  convertUrlToLink(convertNewLinesToBr(data.answ))}) : '';
  }

  useEffect(() => {
    let newDataList = data.filter(item => item.answ.toLowerCase().includes(search.toLowerCase()));
    if (!search) {
      newDataList = [...data];
    }
    setDataList(newDataList);
  }, [search]);

  return (
    <div className="container">
      
      <div className="find-form">
        <button onClick={() => setSearch('')} className="find-form-btn">Очистити пошук</button>
        <input 
          className="find-form-input" 
          type="text"
          value={ search }
          onChange={ e => setSearch(e.target.value) }
        />
      </div>

      <div className="sheet">
        
        <div className="qst">
        <h2 className="block-title">Питання</h2>
          <ul className="qst-list">
            { qsts }
          </ul>
        </div>
        
        <div className="answ">
          <h2 className="block-title">Відповіді</h2>
          <p className="answ-block" dangerouslySetInnerHTML={createMarkup(getAnsw(currentQstId))}></p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
