export function formatInput(
  value: string,
  type: "cpf" | "phone" | "cro"
): string {
  switch (type) {
    case "cpf": {
      const cleaned = value.replace(/\D/g, "");
      return cleaned
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    case "phone": {
      const cleaned = value.replace(/\D/g, "");
      return cleaned
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }

    case "cro": {
      const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      const letters = cleaned.slice(0, 2);
      const numbers = cleaned.slice(2, 7);
      return `${letters}${numbers ? `-${numbers}` : ""}`;
    }

    default:
      return value;
  }
}
