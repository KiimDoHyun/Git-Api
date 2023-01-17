import "./App.css";
import SetRepoList from "./Setting/SetRepoList";
import Router from "./Router/Router";
import SideBarComponent from "./Component/SideBarComponent";
import { DragDropContext } from "react-beautiful-dnd";
import useOnDrag from "./Hook/useOnDrag";
import { useEffect } from "react";
function App() {
    const [saveTargetRef, onDragStart, onDragEnd] = useOnDrag();

    useEffect(() => {
        console.log(">> 리렌더링");
    });

    return (
        <div className="App">
            {/* Setting */}
            <SetRepoList />

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                {/* Side */}
                <SideBarComponent />

                {/* Main */}
                <Router saveTargetRef={saveTargetRef} />
            </DragDropContext>
        </div>
    );
}

export default App;
