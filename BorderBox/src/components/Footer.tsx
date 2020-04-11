import React from 'react';

import './HeaderAndFooter.css';

import { arrowForward} from 'ionicons/icons'

import {
  IonButton,
  IonFooter,
  IonIcon
} from "@ionic/react";

type State = {
    activeContent: string,
    enableButton: boolean,
    hasPhotosUploaded: boolean
}

export class Footer extends React.Component<{
    activeContent: string,
     hasPhotosUploaded: boolean,
     NavigateForward: () => void}, State> {
    constructor(props: any) 
    {
      super(props);
  
      this.state = 
      {
        activeContent: this.props.activeContent,
        hasPhotosUploaded: this.props.hasPhotosUploaded,
        enableButton: false
      }
  }

  isButtonEnabled(){
    let enableButton = false;
    if (this.props.activeContent !== "Complete")
    {
        if (this.props.activeContent === 'SelectStyle' && !this.props.hasPhotosUploaded)
        {
            return false;
        }
        return true;
    }
    return false;
  }

  render() 
  {
    return(
        <IonFooter>
            <IonButton disabled={!this.isButtonEnabled()} expand="block" onClick={() => this.props.NavigateForward()}> Continue
                <IonIcon slot="end" src={arrowForward}></IonIcon>
            </IonButton> 
        </IonFooter>
            )
        }
}

export default Footer