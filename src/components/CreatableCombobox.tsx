import { useMemo } from "react";
import { Autocomplete } from "@base-ui/react";
import { PlusIcon } from "lucide-react";
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@shadcn-ui/components/ui/combobox";

interface ComboboxOption {
  value: string;
  label: string;
  creatable?: boolean;
}

interface CreatableComboboxProps {
  id: string;
  name: string;
  /** The current text value, owned by the parent (e.g. a form field). */
  value: string;
  /** Fires on every change: typing, picking a suggestion, or pressing "Create". */
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  /** Distinct previously used values to suggest. */
  suggestions: string[];
  placeholder?: string;
  "aria-invalid"?: boolean;
  /** Element to portal the popup into (e.g. a dialog's content element). */
  container?: HTMLElement | null;
}

const optionToString = (option: ComboboxOption) => option.value;

export const CreatableCombobox = ({
  id,
  name,
  value,
  onValueChange,
  onBlur,
  suggestions,
  placeholder,
  "aria-invalid": ariaInvalid,
  container,
}: CreatableComboboxProps) => {
  const trimmed = value.trim();

  const options = useMemo<ComboboxOption[]>(() => {
    const base = suggestions.map((s) => ({ value: s, label: s }));
    if (!trimmed) return base;

    const exactMatch = suggestions.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase(),
    );
    if (exactMatch) return base;

    return [
      ...base,
      { value: trimmed, label: `Create "${trimmed}"`, creatable: true },
    ];
  }, [suggestions, trimmed]);

  return (
    <Autocomplete.Root
      value={value}
      onValueChange={onValueChange}
      items={options}
      itemToStringValue={optionToString}
    >
      <ComboboxInput
        id={id}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        aria-invalid={ariaInvalid}
        autoComplete="off"
      />
      <ComboboxContent container={container}>
        <ComboboxEmpty>No suggestions.</ComboboxEmpty>
        <ComboboxList>
          {(option: ComboboxOption) => (
            <ComboboxItem key={option.value} value={option}>
              {option.creatable && (
                <PlusIcon className="text-muted-foreground" />
              )}
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Autocomplete.Root>
  );
};
