var t = require('..');

describe("template()", function() {

  it("inserts scalar variables in a string", function() {

    var string = 'Obi-Wan is ${adjective}.';
    expected = 'Obi-Wan is awesome.';
    var result = t(string, { adjective: 'awesome' });
    expect(result).toBe(expected);

  });

  it("inserts object variables supporting `__toString()` in a string", function() {

    var string = 'Obi-Wan is a ${type}.';
    expected = 'Obi-Wan is a jedi.';

    var stub = {};
    stub.toString = function() {
      return 'jedi';
    };

    var result = t(string, { type: stub });
    expect(result).toBe(expected);

  });

  it("inserts a variable as many time as it exists a placeholder", function() {

    var string = '${a} ${b} ${a} ${a}';
    expected = '1 2 1 1';
    var result = t(string, { a: 1, b: 2 });
    expect(result).toBe(expected);

  });

  it("inserts a variable with custom placeholder", function() {

    var string = '%a %b %a %a';
    expected = '1 2 1 1';
    var result = t(string, { a: 1, b: 2 }, { before: '%', after: '' });
    expect(result).toBe(expected);

  });

  it("escapes escaped placeholder", function() {

    var string = '${a} ${b} \\${a} ${a}';
    expected = '1 2 ${a} 1';
    var result = t(string, { a: 1, b: 2 }, { escape: '\\' });
    expect(result).toBe(expected);

  });

  it("inserts variables using an array", function() {

    var string = '${0} ${1}';
    expected = '1 2';
    var result = t(string, [1, 2]);
    expect(result).toBe(expected);

  });

});

describe("template.clean()", function() {

  it("cleans placeholder", function() {

    var result = t.clean('${incomplete}');
    expect(result).toBe('');

  });

  it("cleans placeholder with a default string", function() {

    var result = t.clean('${incomplete}', { replacement: 'complete' });
    expect(result).toBe('complete');

  });

  it("cleans placeholder and adjacent spaces", function() {

    var result = t.clean('${a} 2 3');
    expect(result).toBe('2 3');

    var result = t.clean('2 ${a} 3');
    expect(result).toBe('2 3');

    var result = t.clean('2 3 ${a}');
    expect(result).toBe('2 3');

  });

  it("cleans placeholder and adjacent commas", function() {

    var result = t.clean('${a}, 2, 3');
    expect(result).toBe('2, 3');

    var result = t.clean('2, ${a}, 3');
    expect(result).toBe('2, 3');

    var result = t.clean('${a}, ${b}, 3');
    expect(result).toBe('3');

    var result = t.clean('${a}, 3, ${b}');
    expect(result).toBe('3');

    var result = t.clean('${a}, ${b}, ${c}');
    expect(result).toBe('');

  });

  it("cleans placeholder and adjacent `'and'`", function() {

    var result = t.clean('${a} and 2 and 3');
    expect(result).toBe('2 and 3');

    var result = t.clean('2 and ${a} and 3');
    expect(result).toBe('2 and 3');

    var result = t.clean('${a} and ${b} and 3');
    expect(result).toBe('3');

    var result = t.clean('${a} and 3 and ${b}');
    expect(result).toBe('3');

    var result = t.clean('${a} and ${b} and ${c}');
    expect(result).toBe('');

  });

  it("cleans placeholder and adjacent comma and `'and'`", function() {

    var result = t.clean('${a}, 2 and 3');
    expect(result).toBe('2 and 3');

    var result = t.clean('${a}, 2 and ${c}');
    expect(result).toBe('2');

  });

  it("cleans placeholder with special chars", function() {

      var string = '${a} ${b}';
      var result = t.clean(string, { before: '${', after: '}' });
      expect(result).toBe('');

  });

});

