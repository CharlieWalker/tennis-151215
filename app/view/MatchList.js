/*
 * File: app/view/MatchList.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TTApp.view.MatchList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.matchlist',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        id: 'MatchList',
        title: 'ホーム',
        store: 'Matchs',
        

        itemTpl: [
                // '<div>',
                // '    <tpl if="completed">COMPLETED:</tpl>',
                // '    {priority} -',
                // '    {description}',
                // '    <tpl if="dueDate"> - {dueDate:date}</tpl>',
                // '</div>'
                //{[values.company.toUpperCase() + ", " + values.title]}
                '<div class="mlistx">',
                '       <tpl if="isSingle">',
                '           {player11last} {player11first} vs. {player21last} {player21first}',
                '       <tpl else>',
                '           {player11last} / {player12last} vs. {player21last} / {player22last}',
                '       </tpl>',
                '    <br />',
                '    <font size="-1">{gname} {[values.gdate.getFullYear()]}</font>',
                '</div>',
        ],

        //onItemDisclosure: true
    }

});

