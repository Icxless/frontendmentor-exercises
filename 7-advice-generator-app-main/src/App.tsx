import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import dice from "./assets/icon-dice.svg";
import DividerDesktop from "./assets/pattern-divider-desktop.svg";
import DividerMobile from "./assets/pattern-divider-mobile.svg";
import "./css/App.css";

function App() {
    const [advice, setAdvice] = useState(null);
    const [id, setID] = useState(null);

    const getAdvice = async () => {
        try {
            const data = await (
                await fetch("https://api.adviceslip.com/advice", {
                    cache: "no-cache",
                })
            ).json();
            //console.log(data);
            setAdvice(data.slip.advice);
            setID(data.slip.id);
        } catch (err) {
            console.log(err);
        }
    };

    const checkAdvice = () => {
        if (advice == null) {
            return (
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            );
        } else {
            return <q>{advice}</q>;
        }
    };

    return (
        <>
            <main>
                <div className="container" onLoad={getAdvice}>
                    {id && <h1>ADVICE #{id}</h1>}
                    {checkAdvice()}
                    <picture>
                        <source
                            media="(min-width: 376px)"
                            srcSet={DividerDesktop}
                        />
                        <source
                            media="(max-width: 375px)"
                            srcSet={DividerMobile}
                        />
                        <img src={DividerDesktop} alt="" />
                    </picture>
                </div>
                <div className="container-btn">
                    <button onClick={getAdvice}>
                        <img src={dice} alt="" height="20rem" />
                    </button>
                </div>
                <div className="attribution"></div>
            </main>
        </>
    );
}

export default App;
