import { Component, StrictMode } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './controls.css';
import './price-scale.css';

class AppErrorBoundary extends Component<{children:ReactNode},{hasError:boolean}> {
 state={hasError:false};
 static getDerivedStateFromError(){return {hasError:true};}
 componentDidCatch(error:Error,info:ErrorInfo){console.error('LUMEN UI error',error,info);}
 reset=()=>this.setState({hasError:false});
 render(){if(this.state.hasError)return <main className="error-state" role="alert"><h1>We couldn't build this recommendation.</h1><p>The selected inputs are empty or inconsistent. Reset the configuration and try again.</p><button type="button" onClick={this.reset}>Reset and retry</button></main>;return this.props.children;}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary><App /></AppErrorBoundary>
  </StrictMode>
);
