Ext.define('Eatsy.view.events.Event', {
	extend: 'Ext.panel.Panel',
	xtype: 'event',
  id: 'eventPanel',
	requires: [
    'Eatsy.view.events.EventsController',
    'Eatsy.view.comments.Comments'
	],
  controller: 'events',
	reference: 'event',
	title: 'Event',
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      margin: '0 10 0 0',
      height: 180,
      padding: '10 10 10 10',
      id: 'eventDescription',
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="container">',
            '<div class="row">',

              '<div class="col-sm-12">',
                '<div class="media">',
                  '<div class="thumb-wrap media-left">',
                    '<img style="max-width:150px;" class="media-object" <tpl if="values.picture == \'\'"> src="http://occ144datkn3vrjlq7r63p19.wpengine.netdna-cdn.com/wp-content/uploads/2015/11/food-plate-4.jpg" <tpl else> src="{picture}"  </tpl> >',
                  '</div>',
                  '<div class="media-body">',
                    '<h4 class="media-heading">{title}</h4>',
                    '<p>{description}</p>',
                    '<span class="text-primary"><h3>{[Eatsy.util.Util.dateTimeRenderer(values.modified)]}</h3></span>',
										'<h4><span class="label label-info">Location: {location}</span></h4>',
                  '</div>',
                '</div>',
              '</div>',

            '</div>',
          '</div>',
        '</tpl>'
      )
    },
    {
      xtype: 'container',
      height: 60,
      layout: {
        type: 'hbox',
        allign: 'center'
      },
      padding: '10 10 10 15',
      items: [
        {
          xtype: 'button',
					id: 'attendButton',
					disabled: true,
					hidden: true,
          text:'Attend',
          width: 75,
          scale: 'medium'
        }
      ]
    },
    {
      html: '<hr/>'
    },
    {
      xtype: 'container',
      flex:1,
      scrollable: true,
      items: [
        {
          xtype: 'comments'
        }
      ]
    }
  ]
});
