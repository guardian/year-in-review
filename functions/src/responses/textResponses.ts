const combineTextResponses = (
  part1: string | [string, string],
  part2: string | [string, string]
): [string, string] => {
  if (typeof part1 === 'string' && typeof part2 === 'string') {
    return [part1, part2];
  }
  if (typeof part1 === 'string' && part2 instanceof Array) {
    return [part1, combineStrings(part2)];
  }
  if (part1 instanceof Array && typeof part2 === 'string') {
    return [combineStrings(part1), part2];
  }
  if (part1 instanceof Array && part2 instanceof Array) {
    return [combineStrings(part1), combineStrings(part2)];
  } else {
    // tslint:disable-next-line:no-console
    console.error(
      `There was an error when trying to combine ${part1} and ${part2}.`
    );
    return ['', ''];
  }
};

const combineStrings = (strings: [string, string]): string => {
  return `${strings[0]}\n\n${strings[0]}`;
};

export { combineTextResponses };
