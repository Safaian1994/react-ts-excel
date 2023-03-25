import * as React from 'react';
import './style.css';
import * as XLSX from 'xlsx';

export default function App() {
  const [items, setItems] = React.useState([]);
  const [sheetOption, setSheetOption] = React.useState('');
  const [header, setHeader] = React.useState([]);

  const [sheets, setSheets] = React.useState([]);

  const readExcelFile = (e) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(e.target.files[0]);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: 'buffer',
        });
        
        const wsname = wb.SheetNames[1];
        
        setSheets(wb.SheetNames);
        setSheetOption(wsname);
        const ws = wb.Sheets[wsname];
        
        const data = XLSX.utils.sheet_to_json(ws);
        
        setItems(data);
        
        setHeader(Object.keys(data[0]));

        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => {});
  };
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <input type="file" onChange={(e) => readExcelFile(e)} />
      <hr />
      <div>
        {
          <select
            onChange={(e) => setSheetOption(e.target.value)}
            value={sheetOption}
          >
            <option>select </option>
            {sheets.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        }
        {items.map((item, index) => (
          <div key={item.id}>
{
  header.map((head)=>
 <span>
  {
   head + ' : '+ item[head]+' | '

  }
  </span>
  )
}
            
            </div>
        ))}
      </div>
    </div>
  );
}
