var money = 0;
var moneyInCount = 1;
var kOfCost = 1.3;

const boosts = new Map([
	['dblclick', 0],
	['autoclick', 0]
]);

const costBoost = new Map([
	['dblclick', 10],
	['autoclick', 100]
]);

const moneyBlock = document.querySelector(".game__head__points span");
const buttonBlock = document.querySelector(".game__button");
const boostButton = document.querySelector(".game__viewArea");
const boostBlock = document.querySelector(".game__boost");
const boostBuy = document.querySelectorAll(".game__boost__item--buy");
const boostCount = document.querySelectorAll(".game__boost__item--title");
const boostCost = document.querySelectorAll(".game__boost__item--desc");




boostButton.addEventListener("click", ()=>{
	boostBlock.classList.toggle("active");
});

buttonBlock.addEventListener("click", ()=>{
	ChangeMoney(moneyInCount, 0);
});


boostBuy.forEach((button)=>{

	button.addEventListener("click", ()=>{
		switch (button.dataset.boostid) {
			case "dblclick":
			{
				if(money < costBoost.get('dblclick'))
				{
					alert("Недостаточно средств");
					break;
				}
				moneyInCount += 1;
				boosts.set('dblclick', boosts.get('dblclick')+1);
				ChangeMoney(0, costBoost.get('dblclick'));
				costBoost.set('dblclick', Math.round(costBoost.get('dblclick') * kOfCost));
				Update();
				boostCount.forEach((count)=>{
					switch(count.dataset.boostid)
					{
						case "dblclick":
						{
							count.childNodes[1].innerText = boosts.get('dblclick');
							break;
						}
						default:
						{
							break;
						}
					}
				});
				break;
			}
			case "autoclick":
			{
				if(money < costBoost.get('autoclick'))
				{
					alert("Недостаточно средств");
					break;
				}
				boosts.set('autoclick', boosts.get('autoclick')+1);
				ChangeMoney(0, costBoost.get('autoclick'));
				costBoost.set('autoclick', Math.round(costBoost.get('autoclick') * kOfCost));
				Update();
				AutoClick(boosts.get('autoclick'));
				boostCount.forEach((count)=>{
					switch(count.dataset.boostid)
					{
						case "autoclick":
						{
							count.childNodes[1].innerText = boosts.get('autoclick');
							break;
						}
						default:
						{
							break;
						}
					}
				});
				break;
			}
			default:
				alert("Неизвестная кнопка");
				break;
		}
	});

});


function AutoClick(count)
{
	var autoTimer = setInterval(ChangeMoney, 1000, moneyInCount*count, 0);}

function Update()
{
	moneyBlock.innerText = money;
	boostCost.forEach((item)=>{
		switch(item.dataset.boostid)
		{
			case "dblclick":
			{
				item.childNodes[1].innerText = costBoost.get('dblclick');
				break;
			}
			case "autoclick":
			{
				item.childNodes[1].innerText = costBoost.get('autoclick');
				break;
			}
			default:
			{
				break;
			}
		}
	});
}

function ChangeMoney(toIncrease, toDiscrease)
{
	money += toIncrease;
	money -= toDiscrease;
	Update();
}