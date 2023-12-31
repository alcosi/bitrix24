<?
class CDavXmlNode
{
	private $tagname;
	private $xmlns;
	private $attributes;
	private $content;

	/**
	* Constructor
	*
	* @param string $tagname The tag name of the new element
	* @param mixed $content Either a string of content, or an array of sub-elements
	* @param array $attributes An array of attribute name/value pairs
	* @param array $xmlns An XML namespace specifier
	*/
	public function __construct($tagname, $content = false, $attributes = false, $xmlns = null)
	{
		$this->tagname = $tagname;
		if (is_object($content))
		{
			$this->content = [&$content];
		}
		else
		{
			$this->content = $content;
		}

		$this->attributes = $attributes;
		if (isset($this->attributes['xmlns']))
		{
			$this->xmlns = $this->attributes['xmlns'];
		}

		if (isset($xmlns))
		{
			$this->xmlns = $xmlns;
			if (!$this->attributes || !is_array($this->attributes))
			{
				$this->attributes = [];
			}
			$this->attributes['xmlns'] = $xmlns;
		}
	}

	public function GetTag()
	{
		return $this->tagname;
	}

	public function GetAttribute($name)
	{
		return $this->attributes[$name] ?? null;
	}

	public function GetXmlNS()
	{
		return $this->xmlns;
	}

	public function GetContent()
	{
		return $this->content;
	}

	/**
	* Return an array of elements matching the specified path
	*
	* @return array The CDavXmlNode within the tree which match this tag
	*/
	public function GetPath($path)
	{
		$elements = array();

		if (!preg_match('#(/)?([^/]+)(/?.*)$#', $path, $matches))
		{
			return $elements;
		}

		$searchTagname = $matches[2];
		$searchXmlns = "";
		if (preg_match('/^(.*):([^:]+)$/', $searchTagname, $matches1))
		{
			$searchXmlns = $matches1[1];
			$searchTagname = $matches1[2];
		}

		if ($matches[2] == '*' || mb_strtolower($searchTagname) == mb_strtolower($this->tagname) && (empty($searchXmlns) || mb_strtolower($searchXmlns) == mb_strtolower($this->xmlns)))
		{
			if ($matches[3] == '')
			{
				$elements[] = $this;
			}
			elseif (is_array($this->content))
			{
				foreach ($this->content as $val)
				{
					$elements = array_merge($elements, $val->GetPath($matches[3]));
				}
			}
		}

		if ($matches[1] != '/' && is_array($this->content))
		{
			foreach ($this->content as $key => $val)
			{
				$elements = array_merge($elements, $val->GetPath($path));
			}
		}

		return $elements;
	}

	/**
	* Return an array of child elements matching the specified tag, or all elements if no tag is supplied.
	*
	* @return array The XMLElements within the tree which match this tag
	*/
	public function GetChildren($tag = null, $recursive = false)
	{
		$elements = array();
		if (is_array($this->content))
		{
			foreach ($this->content as $val)
			{
				if (!isset($tag) || (isset($val->tagname) && $val->tagname == $tag))
				{
					$elements[] = $val;
				}

				if ($recursive)
				{
					$elements = $elements + $val->GetChildren($tag, true);
				}
			}
		}
		elseif (!isset($tag) || (isset($this->content->tagname) && $this->content->tagname == $tag))
		{
			$elements[] = $this->content;
		}
		return $elements;
	}
}
?>