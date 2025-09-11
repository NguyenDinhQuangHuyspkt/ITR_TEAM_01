import { Input } from "antd";
import { useRef, useState, type ChangeEvent } from "react";

interface SearchDebounceProps {
  onSubmit?: (values: { search: string }) => void;
  className?: string;
  placeholder?: string;
}

const SearchDebounce: React.FC<SearchDebounceProps> = ({
  onSubmit,
  placeholder,
}) => {
  const [search, setSearch] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSubmit({ search: value });
    }, 300);
  };

  return (
      <Input
        type='text'
        width={100}
        value={search}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />

  );
};

export default SearchDebounce;
