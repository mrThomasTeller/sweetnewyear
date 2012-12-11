(function(){
	var _setHtml = function(node, html) {
		var virtualChildren = _getVirtualChildren(node);
		for (var i = 0, j = virtualChildren.length; i < j; i++)
			ko.removeNode(virtualChildren[i]);

		if ((html !== null) && (html !== undefined)) {
			if (typeof html != 'string')
				html = html.toString();

			var parsedNodes = ko.utils.parseHtmlFragment(html);
			var endCommentNode = node.nextSibling;
			for (var i = 0, j = parsedNodes.length; i < j; i++)
				endCommentNode.parentNode.insertBefore(parsedNodes[i], endCommentNode);
		}
	};

	function _getVirtualChildren(startComment, allowUnbalanced) {
		var currentNode = startComment;
		var depth = 1;
		var children = [];
		while (currentNode = currentNode.nextSibling) {
			if (_isEndComment(currentNode)) {
				depth--;
				if (depth === 0)
					return children;
			}

			children.push(currentNode);

			if (_isStartComment(currentNode))
				depth++;
		}
		if (!allowUnbalanced)
			throw new Error("Cannot find closing comment tag to match: " + startComment.nodeValue);
		return null;
	}

	var _commentNodesHaveTextProperty = document.createComment("test").text === "<!--test-->";
	var _endCommentRegex = _commentNodesHaveTextProperty ? /^<!--\s*\/ko\s*-->$/ : /^\s*\/ko\s*$/;
	function _isEndComment(node) {
		return (node.nodeType == 8) && (_commentNodesHaveTextProperty ? node.text : node.nodeValue).match(_endCommentRegex);
	}
	function _isStartComment(node) {
		return (node.nodeType == 8) && (commentNodesHaveTextProperty ? node.text : node.nodeValue).match(startCommentRegex);
	}

	ko.bindingHandlers['vhtml'] = {

		'init': function() {
			// Prevent binding on the dynamically-injected HTML (as developers are unlikely to expect that, and it has security implications)
			return { 'controlsDescendantBindings': true };
		},
		'update': function (element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			_setHtml(element, value);
		}
	};
	ko.virtualElements.allowedBindings['vhtml'] = true;
})();
