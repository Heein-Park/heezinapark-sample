import { render } from '@testing-library/react';
import LanguageSelect from 'components/LanguageSelect';
import '@testing-library/jest-dom';

jest.mock('next/router', () => require('next-router-mock'));

describe('LanguageSelect', () => {
  it('renders a heading', () => {
    render(<LanguageSelect />);
  });
});