import { describe, expect, it, vi } from 'vitest';
import { ErrorState } from './ErrorState';

describe('error recovery UI',()=>{
 it('renders a visible error and both recovery actions',()=>{const view=ErrorState({onRetry:vi.fn(),onReset:vi.fn()}),children=view.props.children as any[],buttons=children[2].props.children as any[];expect(view.props.role).toBe('alert');expect(children[0].props.children).toBe("We couldn't build this recommendation.");expect(buttons.map(x=>x.props.children)).toEqual(['Reset and retry','Reset configuration']);});
 it('separates retry from full configuration reset',()=>{const onRetry=vi.fn(),onReset=vi.fn(),view=ErrorState({onRetry,onReset}),buttons=(view.props.children as any[])[2].props.children as any[];buttons[0].props.onClick();expect(onRetry).toHaveBeenCalledOnce();expect(onReset).not.toHaveBeenCalled();buttons[1].props.onClick();expect(onReset).toHaveBeenCalledOnce();});
});
