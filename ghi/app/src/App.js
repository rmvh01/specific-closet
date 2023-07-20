import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import HatForm from './HatForm';
import ShoesList from './ShoesList';
import ShoesForm from './ShoesForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList />} />
            <Route path='create' element={<ShoesForm />} />
          </Route>
          <Route path="hats">
            <Route index element={<HatList />} />
            <Route path='create' element={<HatForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
