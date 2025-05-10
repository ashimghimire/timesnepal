import MainFiveColumn from '../containers/MainFiveColumn';
import MainThreeColumn from '../containers/MainThreeColumn';
import MainTwoColumn from '../containers/MainTwoColumn';
import React from 'react';
import Triangle from './Triangle';


const Main = ({ isLoading }) => {
    return (
        
       <main>
                
                <MainThreeColumn/>
                {!isLoading && <div className="divider"><Triangle text='Sports'/></div>}
                <MainFiveColumn type="sports"/>
                {!isLoading && <div className="divider"><Triangle text='Politics'/></div>}
               <MainFiveColumn type="politics" />
            </main>
            
    );
};



export default Main;