import { useState } from 'react';
import Card from './Card';
import Button from './button/button';  // Assurez-vous que le chemin d'importation est correct

function Cards() {
    const initialItems = [
        { id: 1, img: '/img/hellokitty.jpg', stat: "" },
        { id: 1, img: '/img/hellokitty.jpg', stat: "" },
        { id: 2, img: '/img/badtz.jpg', stat: "" },
        { id: 2, img: '/img/badtz.jpg', stat: "" },
        { id: 3, img: '/img/cinamonroll.jpg', stat: "" },
        { id: 3, img: '/img/cinamonroll.jpg', stat: "" },
        { id: 4, img: '/img/kuromi.jpg', stat: "" },
        { id: 4, img: '/img/kuromi.jpg', stat: "" },
        { id: 5, img: '/img/melody.jpg', stat: "" },
        { id: 5, img: '/img/melody.jpg', stat: "" },
        { id: 6, img: '/img/purin.jpg', stat: "" },
        { id: 6, img: '/img/purin.jpg', stat: "" },
        { id: 7, img: '/img/karoppl.jpg', stat: "" },
        { id: 7, img: '/img/karoppl.jpg', stat: "" },
        { id: 8, img: '/img/pochaco.jpg', stat: "" },
        { id: 8, img: '/img/pochaco.jpg', stat: "" }
    ].sort(() => Math.random() - 0.5);

    const [items, setItems] = useState(initialItems);
    const [prev, setPrev] = useState(-1);
    const [gameWon, setGameWon] = useState(false);

    function resetGame() {
        setItems([...initialItems].sort(() => Math.random() - 0.5));
        setGameWon(false);
    }

    function check(current) {
        if (items[current].id === items[prev].id) {
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setItems([...items]);
            setPrev(-1);
            
            if (items.every(item => item.stat === "correct")) {
                setGameWon(true);
            }
        } else {
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            setItems([...items]);
            setTimeout(() => {
                items[current].stat = "";
                items[prev].stat = "";
                setItems([...items]);
                setPrev(-1);
            }, 1000);
        }
    }

    function handleClick(id) {
        if (prev === -1) {
            items[id].stat = "active";
            setItems([...items]);
            setPrev(id);
        } else {
            check(id);
        }
    }

    return (
        <div className="container">
            {gameWon ? (
                <div className="win-message">
                    <h2>Bravo tu as gagné!</h2>
                    <Button onClick={resetGame}>Rejouer</Button>  {/* Le bouton rejouer*/}
                </div>
            ) : null}
            {items.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            ))}
        </div>
    );
}

export default Cards;
