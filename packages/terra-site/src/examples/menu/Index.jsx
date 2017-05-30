/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-menu/docs/README.md';
import { version } from 'terra-menu/package.json';

// Component Source
/* eslint-disable import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */
import MenuSrc from '!raw-loader!terra-menu/src/Menu';
import MenuItemSrc from '!raw-loader!terra-menu/src/MenuItem';
import MenuItemGroupSrc from '!raw-loader!terra-menu/src/MenuItemGroup';
/* eslint-enable import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */

// Example Files
import BasicMenu from './BasicMenu';
import PopupMenu from './PopupMenu';

const MenuExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <h2>Menu</h2>
    <PropsTable id="props" src={MenuSrc} />
    <h2>Menu Item</h2>
    <PropsTable src={MenuItemSrc} />
    <h2>Menu Group</h2>
    <PropsTable src={MenuItemGroupSrc} />
    <h2>Basic Menu</h2>
    <BasicMenu />
    <h2>PopupMenu</h2>
    <PopupMenu />
  </div>
);

export default MenuExamples;