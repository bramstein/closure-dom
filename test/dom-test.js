describe('dom', function () {
  describe('createElement', function () {
    it('creates an element', function () {
      expect(dom.createElement('div'), 'not to be null');
      expect(dom.createElement('div').nodeName, 'to equal', 'DIV');
    });
  });

  describe('createText', function () {
    it('creates a text node', function () {
      expect(dom.createText('hello'), 'not to be null');
      expect(dom.createText('world').textContent, 'to equal', 'world');
    });
  });

  describe('style', function () {
    it('sets the style', function () {
      var el = dom.createElement('div');

      dom.style(el, 'font-size:12px');

      expect(el.style.fontSize, 'to equal', '12px');
    });
  });

  describe('append', function () {
    it('adds a child node', function () {
      var parent = dom.createElement('div');

      dom.append(parent, dom.createElement('div'));

      expect(parent.childNodes.length, 'to equal', 1);

      dom.append(parent, dom.createElement('div'));

      expect(parent.childNodes.length, 'to equal', 2);
    });
  });

  describe('remove', function () {
    it('removes child nodes', function () {
      var parent = dom.createElement('div'),
          child1 = dom.createElement('div'),
          child2 = dom.createElement('div');

      dom.append(parent, child1);
      dom.append(parent, child2);

      dom.remove(parent, child1);
      expect(parent.childNodes.length, 'to equal', 1);

      dom.remove(parent, child2);
      expect(parent.childNodes.length, 'to equal', 0);
    });
  });

  describe('waitForBody', function () {
    it('waits for the body', function (done) {
      dom.waitForBody(function () {
        expect(document.body, 'to be an object');
        done();
      });
    });
  });

  describe('addListener', function () {
    it('adds an event listener and receives an event', function (done) {
      var event = new Event('test');
      var el = dom.createElement('div');

      dom.addListener(el, 'test', function (e) {
        expect(e.type, 'to equal', 'test');
        done();
      });

      el.dispatchEvent(event);
    });
  });

  describe('hasClass', function () {
    it('returns false if there are no classes', function () {
      var el = dom.createElement('div');

      expect(dom.hasClass(el, 'test'), 'to be false');
    });

    it('returns false if there are classes but none match', function () {
      var el = dom.createElement('div');
      el.className = 'test';

      expect(dom.hasClass(el, 'hello'), 'to be false');
    });

    it('returns true if the class matches', function () {
      var el = dom.createElement('div');

      el.className = 'test';

      expect(dom.hasClass(el, 'test'), 'to be true');
    });
  });

  describe('addClass', function () {
    it('adds a class', function () {
      var el = dom.createElement('div');

      dom.addClass(el, 'hello');

      expect(el.className, 'to equal', ' hello');
    });

    it('adds multiple classes', function () {
      var el = dom.createElement('div');

      dom.addClass(el, 'hello');
      dom.addClass(el, 'world');

      expect(el.className, 'to equal', ' hello world');
    });

    it('removes duplicates', function () {
      var el = dom.createElement('div');

      dom.addClass(el, 'hello');
      dom.addClass(el, 'hello');

      expect(el.className, 'to equal', ' hello');
    });
  });

  describe('removeClass', function () {
    it('does nothing when the class is not found', function () {
      var el = dom.createElement('div');

      el.className = 'world';

      dom.removeClass(el, 'hello');

      expect(el.className, 'to equal', 'world');
    });

    it('removes the class', function () {
      var el = dom.createElement('div');

      el.className = 'world';

      dom.removeClass(el, 'world');

      expect(el.className, 'to equal', '');
    });

    it('removes the class from several', function () {
      var el = dom.createElement('div');

      el.className = 'hello world';

      dom.removeClass(el, 'world');

      expect(el.className, 'to equal', 'hello');
    });
  });

  describe('replaceClass', function () {
    it('does nothing when the class is not found', function () {
      var el = dom.createElement('div');

      el.className = 'world';

      dom.replaceClass(el, 'hello', 'world');

      expect(el.className, 'to equal', 'world');
    });

    it('replaces the class', function () {
      var el = dom.createElement('div');

      el.className = 'world';

      dom.replaceClass(el, 'world', 'hello');

      expect(el.className, 'to equal', 'hello');
    });

    it('replaces the class from several', function () {
      var el = dom.createElement('div');

      el.className = 'hello world';

      dom.replaceClass(el, 'world', 'moon');

      expect(el.className, 'to equal', 'hello moon');
    });
  });
});
