import { Component, StrictMode, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorState } from './ErrorState';
import './styles.css';
import './controls.css';
import './price-scale.css';

class AppErrorBoundary extends Component<{children:ReactNode;onReset:()=>void},{hasError:boolean}> {
 state={hasError:false};
 static getDerivedStateFromError(){return {hasError:true};}
 componentDidCatch(error:Error,info:ErrorInfo){console.error('LUMEN UI error',error,info);}
 retry=()=>this.setState({hasError:false});
 render(){if(this.state.hasError)return <ErrorState onRetry={this.retry} onReset={this.props.onReset}/>;return this.props.children;}
}

function Root(){const [resetKey,setResetKey]=useState(0);const reset=()=>setResetKey(key=>key+1);return <AppErrorBoundary key={resetKey} onReset={reset}><App /></AppErrorBoundary>}

createRoot(document.getElementById('root')!).render(<StrictMode><Root /></StrictMode>);
