import React from 'react';

import './HeaderAndFooter.css';

import { menu, arrowBack} from 'ionicons/icons'

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonRow,
  IonIcon
} from "@ionic/react";

type State = {
    activeContent: string,
}

export class Header extends React.Component<{
    activeContent: string,
    NavigateBack: () => void}, State> {
    constructor(props: any) 
    {
      super(props);
  
      this.state = 
      {
        activeContent: this.props.activeContent,
      }
  }

  render() 
  {
    return(
            <IonHeader>
                <IonToolbar>
                    <IonRow className="headerRow">
                            <IonButton  disabled={this.props.activeContent === 'Home'} onClick={() => this.props.NavigateBack()} >
                                <IonIcon src={arrowBack}></IonIcon>
                            </IonButton>
                            <IonTitle> {this.props.activeContent}</IonTitle>
                            <IonButton> 
                                <IonIcon src={menu}></IonIcon>
                            </IonButton>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            )
        }
}

export default Header