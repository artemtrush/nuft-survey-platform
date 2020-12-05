<?php

namespace src\helpers;

class CategoryHelp
{
    private static $_parents = [];

    public static function parents($category)
    {
        self::$_parents[$category->id] = $category;
        self::parentsRecursive($category);
        return self::nameStr();
    }

    public static function parentsRecursive($category)
    {
        if ($category->parent) {
            self::$_parents[$category->parent->id] = $category->parent;
            self::parentsRecursive($category->parent);
        }
    }

    public static function nameStr()
    {
        $name = '';
        foreach (array_reverse(self::$_parents) as $item) {
            $name .= $item->name . ' / ';
        }
        self::$_parents = [];
        return substr($name, 0, -3);
    }
}
