import { parseAsString, useQueryState } from "nuqs";



export default function useSearchParam() {
  return useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );
}
