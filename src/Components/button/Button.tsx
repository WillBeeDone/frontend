import "../button/Button.css"
interface IButtonProps {
    className?:string, type:"button" | "reset" | "submit", func?:()=>void, text?:string
}
//* {className, type,func,text = "click"} - если пропс text при вызове кнопки будет передан, то кнопка получит этот текст, если пропс не будет передан - кнопка получит текст по умолчанию "click"
//* если ставить полю значение по умолчанию, нужно такое поле помечать как опциональное

function Button ({className, type="submit",func=()=>{},text = "click"} : IButtonProps ):JSX.Element{

    return(
            <button className={className} type={type} onClick={func}>{text}</button>
    );
}

export default Button