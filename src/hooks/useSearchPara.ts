import { parseAsString, useQueryState } from "nuqs";



export default function useSearchParam(key: string) {
  return useQueryState(
    key,
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );
}
