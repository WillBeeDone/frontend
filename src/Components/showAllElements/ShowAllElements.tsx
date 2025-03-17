import { useEffect } from "react";
import "./ShowAllElements.css";

interface ShowAllElementsProps {
  array?: (Record<string, any> | any[] | string | number)[];
  uniqueKey?: string | number;
  switcher?:number;
  link?:string;
  img?:string;
  image?:string;
  message_for_user?:string
}

export default function ShowAllElements({
  array,
  uniqueKey,
  switcher=1,
  /*message_for_user="All, only for you - my friend !"*/
}: ShowAllElementsProps): JSX.Element {

  /*useEffect (()=> {
    if(message_for_user){alert(message_for_user)}
  }, [message_for_user]);*/

  if(switcher === 1){
    return (
      <div className="showAllElements_mainContainer">
        {array.map((element, index) => {
          // Обробка об'єктів
          if (
            typeof element === "object" &&
            element !== null &&
            !Array.isArray(element)
          ) {
            return (
              <div
                key={uniqueKey || index}
                className="showAllElements_item"
              >
                {Object.keys(element).map((key) => {
                  if (key === "link" && (element.image || element.img)) {
                    // Рендер посилання з картинкою
                    return (
                      <div className="showAllElements_item" key={key}>
                        <a
                          href={element.link}
                          className="showAllElements_item_img_container" target="_blank"
                        >
                          <img
                            src={element.image || element.img}
                            alt="image"
                          />
                        </a>
                      </div>
                    );
                  } else if (
                    (key === "image" || key === "img") &&
                    !("link" in element)
                  ) {
                    // Рендер просто зображення (тільки якщо немає "link")
                    return (
                      <div
                        className="showAllElements_item_img_container"
                        key={key}
                      >
                        <img src={element[key] as string} alt="image" />
                      </div>
                    );
                  } else if (key === "name") {
                    // Рендер назви
                    return <h3 key={key}>{`${key}: ${element[key]}`}</h3>;
                  } else {
                    // Інші ключі
                    return <p key={key}>{`${key}: ${element[key]}`}</p>;
                  }
                })}
              </div>
            );
          }

        // масив
        if (Array.isArray(element)) {
          return (
            <div key={index} className="showAllElements_Array">
              <ShowAllElements array={element} uniqueKey={uniqueKey} />
            </div>
          );
        }

        //простий елемент
        return (
          <div key={index} className="showAllElements_item">
            <p className="showAllElements_Simple">{element}</p>
          </div>
        );
      })}
    </div>
  );
}else if(switcher === 2){
  return (
    <div className="showAllElements_item">
      <a href={link}><img src= {image ? image : img} alt="image" /></a>
    </div>
  );
  
}else {
  return (
  <div className="showAllElements_item">
    <p>I'm waiting for data ;)</p>
  </div>
  )
}
//if (message_for_user && alert({message_for_user})) return <></>;
}