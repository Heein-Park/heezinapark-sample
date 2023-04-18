import * as React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps
} from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';

// Styled Components
const StyledButton = styled('button')(
  ({ theme }) => ({
    marginInlineStart: '1rem',
    marginInlineEnd : '1rem',
    fontFamily: `${theme.typography.fontFamily}`,
  })
);

const StyledListbox = styled('ul')(
  () => ({
    margin: '0px',
    boxSizing: 'border-box',
    overflow: 'auto',
    outline: '0px',
  })
);

const StyledOption = styled(OptionUnstyled)(
  () => ({
    listStyle: 'none',
    cursor: 'pointer',
    ':nth-last-of-type': {
      borderBottom : 'none'
    }
  })
);

const StyledPopper = styled(PopperUnstyled)(
  () => ({
    background: '#ffffff',
  })
);

//
const CustomSelect = React.forwardRef(function CustomSelect<TValue extends string>(
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const slots: SelectUnstyledProps<TValue>['slots'] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
}) as <TValue extends string>(
  props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLButtonElement>,
) => JSX.Element;

function getLanguageName(code: string) {
  type language = {
    name: string;
    code: string;
  }

  const languageConfigs = [
    { name: 'English', code: 'en-US' },
    { name: '한국어', code: 'ko-KR' },
  ] as const;

  const languageFound = languageConfigs.find((language: language) => language.code === code) as language;

  if (!languageFound) {
    return null;
  }

  return languageFound.name as string;
}

function LanguageSelect() {
  const router = useRouter();
  const locale = router.locale as string;
  const locales = router.locales as string[];
  const { asPath } = router;

  const handleChange = React.useCallback((e: React.MouseEvent<Element, MouseEvent>, _newValue:string) => {
    const newValue = _newValue as string | false | undefined;
    router.push(asPath, asPath, { locale: newValue });
  }, [asPath, router]);

  return (
    <CustomSelect value={locale} onChange={handleChange}>
      {locales.map((languageCode: string) => {
        const languageName = getLanguageName(languageCode);
        return (
          <StyledOption value={languageCode} key={`langOption-${languageCode}`}>{languageName}</StyledOption>
        );
      })}
    </CustomSelect>
  );
}

export default LanguageSelect;
