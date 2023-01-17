import "./App.css";
import SetRepoList from "./Setting/SetRepoList";
import Router from "./Router/Router";
import SideBar from "./Component/SideBar";
import { DragDropContext } from "react-beautiful-dnd";
import useOnDrag from "./Hook/useOnDrag";
function App() {
    const [saveTargetRef, onDragStart, onDragEnd] = useOnDrag();

    return (
        <div className="App">
            {/* Setting */}
            <SetRepoList />

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                {/* Side */}
                <SideBar />

                {/* Main */}
                <Router saveTargetRef={saveTargetRef} />
            </DragDropContext>
        </div>
    );
}

export default App;
