function getCatalogNames(){
    return [
            {id: 1, name: 'Hospital Pack List', source: 'U.S. Government Office on Women\'s Health', description: 'Don&#39;t wait until you are in labor to pack for the hospital. A few weeks before your due date, pull together the items from this list. When the big moment arrives, you can double check the list before leaving to pack last-minute items and to be sure you have all you need. Your partner also might want to bring an overnight bag with a change of clothes and personal items.', defaultTag: 'Hospital Pack List'},
            {id: 2, name: 'Baby Wish List', source: 'U.S. Government Office on Women\'s Health', description: 'You	might	not	need	or	want	all	the	items	listed.	You	also	can	add	items	not	listed	here.	Ask	moms	you	know	about	the	items	they	couldn&#39;t	live without	and	the	items	they	never	used.	Some	items	you	will	want	to	purchase	new.	But	keep in	mind	that	babies	outgrow	clothing	and	supplies	quickly.	So,	you	may	want	to	borrow many	of	these	items	or	use	hand-me-downs.	Just	be	sure	to	check	out	product	safety	and recall information.', defaultTag: 'Buy'}
        ];
}


function getCatalogData(catalogName)
{
    var decodedCatalogName = decodeSpacesIn(catalogName);
    return  decodedCatalogName == 'Hospital Pack List' ? getHospitalPackList() : getBabyWishList();
}

function getHospitalPackList()
{
    var hospitalPackList =
[
{ name: 'Bathrobe (mom)', description: '' },
{ name: 'Socks (mom)', description: '' },
{ name: 'Slippers  (mom)', description: '' },
{ name: 'Going-home outfit (mom)', description: '' },
{ name: 'Nursing bra/pads and maternity underwear', description: '' },
{ name: 'Toiletries such as toothbrush/paste', description: '' },
{ name: 'Music', description: '' },
{ name: 'Book', description: '' },
{ name: 'Camera/Video Camera with batteries/charger', description: '' },
{ name: 'Snacks', description: '' },
{ name: 'Phone numbers of friends and family members', description: '' },
{ name: 'Undershirt', description: '' },
{ name: 'Going-home outfit', description: '' },
{ name: 'Pair of booties', description: '' },
{ name: 'Receiving blanket', description: '' },
{ name: 'Diapers and wipes', description: '' },
{ name: 'Rear-facing infant car seat', description: '' },
{ name: 'Diaper bag', description: '' },

];

    return hospitalPackList
}

function getBabyWishList()
{
    var babyWishList =
        [
{ name: 'Onesies', description: '' },
{ name: 'Rompers', description: '' },
{ name: 'Sleepwear', description: '' },
{ name: 'Blanket sleeper (for cold weather)', description: '' },
{ name: 'Baby socks', description: '' },
{ name: 'Hats', description: '' },
{ name: 'Receiving blankets', description: '' },
{ name: 'Diapers', description: '' },
{ name: 'Baby wipes', description: '' },
{ name: 'Diaper rash cream', description: '' },
{ name: 'Digital rectal thermometer', description: '' },
{ name: 'Baby bathtub or insert for your regular tub', description: '' },
{ name: 'Baby shampoo and body wash', description: '' },
{ name: 'Baby lotion', description: '' },
{ name: 'Hooded baby towels or soft regular towels', description: '' },
{ name: 'Baby washcloths or soft regular washcloths', description: '' },
{ name: 'Baby nail clippers', description: '' },
{ name: 'Nasal aspirator', description: '' },
{ name: 'Infant acetaminophen drops', description: '' },
{ name: 'Pacifiers', description: '' },
{ name: 'Crib or bassinet with mattress', description: '' },
{ name: 'Crib bedding', description: '' },
{ name: 'Waterproof mattress pad', description: '' },
{ name: 'Mobile', description: '' },
{ name: 'Changing station with changing pad and covers', description: '' },
{ name: 'Diaper pail', description: '' },
{ name: 'Dresser', description: '' },
{ name: 'Glider or rocking chair', description: '' },
{ name: 'Hamper', description: '' },

        ];

    return babyWishList;
}
