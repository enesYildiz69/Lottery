import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Web3 from 'web3';
import { contract_address, my_lottery_abi } from "./useWeb3";

import "./App.css";

const ModelViewer = require('@metamask/logo');

function App() {
  const [account, setAccount] = useState();
  const [web3State, setWeb3State] = useState();
  const [contractState, setContractState] = useState();

  let [address0, setAddress0] = useState(""); //address
  let [myLotteryTokenAmount, setMyLotteryTokenAmount] = useState("");
  let [myLotteryTokenAmount1, setMyLotteryTokenAmount1] = useState("");
  let [hash_rnd_number, setHash_rnd_number] = useState("");
  let [ticket_type, setTicket_type] = useState("");
  let [ticket_no, setTicket_no] = useState("");
  let [ticket_no1, setTicket_no1] = useState("");
  let [ticket_no2, setTicket_no2] = useState("");
  let [ticket_no3, setTicket_no3] = useState("");
  let [ticket_no4, setTicket_no4] = useState("");
  let [lottery_no, setLottery_no] = useState("");
  let [lottery_no1, setLottery_no1] = useState("");
  let [lottery_no2, setLottery_no2] = useState("");
  let [lottery_no3, setLottery_no3] = useState("");
  let [lottery_no4, setLottery_no4] = useState("");
  let [lottery_no5, setLottery_no5] = useState("");
  let [winning_tickets, setWinning_tickets] = useState("");
  let [unixtimeinweek, setUnixtimeinweek] = useState("");
  const [tickets, setTickets] = useState([]);
  const [lotteries, setLotteries] = useState([]);

  const [results, setResults] = useState({});

  const logoRef = useRef();
  const [refState, setRefState] = useState();

  let selectedAccount;
  let provider = window.ethereum;

  const handleConnect = () => {
    if (typeof provider !== 'undefined') {
      // Metamask is installed.
      provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
        selectedAccount = accounts[0];
        setAccount(selectedAccount);
        console.log(`SelectedAccount is: ${selectedAccount}`);
      }).catch(err => {
        console.log(err);
        return;
      })
    }
  
    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];
      console.log(`SelectedAccount changed to: ${selectedAccount}`);
    });
  
    const web3 = new Web3(provider);
    setWeb3State(web3);

    const contract = new web3.eth.Contract(my_lottery_abi, contract_address);
    setContractState(contract);
  }

  useEffect(() => {
    if(refState) {
      const viewer = ModelViewer({
        // Dictates whether width & height are px or multiplied
        pxNotRatio: true,
        width: 300,
        height: 300,
        followMouse: true,
      });
    
      const container = document.getElementById('logo-container');
      console.log(container)
      container.appendChild(viewer.container);
    }
  }, [refState])
  
  if (!account) {
    return(
      <div className="connect-button-container">
        <div id="logo-container" ref={el => {
          logoRef.current = el;
          if(!refState) setRefState(true);
        }}></div>
        <Button 
          className="connect-button" 
          type="primary" 
          onClick={() => handleConnect()} 
        >
          Connect to MetaMask
        </Button>
      </div>
    );
  }


  // const str2WeiArr = (str) => str.substring(1,str.length -1).split(",").map(s=>web3State.utils.toWei(s, "wei"))

  const handleFunctionCall = async (functionName) => {
    // yes
    if(functionName === "getOwner") {
      contractState.methods.getOwner().call().then(function(result) {
        setResults(results => ({ ...results, getOwner: result }));
      });
    }
    // yes
    if (functionName === "depositEther") {    
      contractState.methods.depositEther(myLotteryTokenAmount).send({ from: account ,value: myLotteryTokenAmount })
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
    // need to try with another acc since it does not work on owner
    if (functionName === "withdrawEther") {
      contractState.methods.withdrawEther(myLotteryTokenAmount1).send({ from: account ,value: myLotteryTokenAmount1 })
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
    // yes
    if(functionName === "getBalance") {
      contractState.methods.getBalance(address0).call().then(function(result) {
        setResults(results => ({ ...results, getBalance: result }));
      });
    }
    // yes
    if(functionName === "generateRandomHash") {
      contractState.methods.generateRandomHash().call().then(function(result) {
        setResults(results => ({ ...results, generateRandomHash: result }));
      });
    }
    // yes
    if (functionName === "LotteryFunction") {
      contractState.methods.LotteryFunction().send({ from: account })
        .then(function(result) {
          console.log("Lottery function executed successfully.");
        })
        .catch(function(error) {
          console.error("Failed to execute lottery function:", error);
        });
    }
    // yes
    if (functionName === "buyTicket") {
      contractState.methods.buyTicket(hash_rnd_number, parseInt(ticket_type)).send({from: account, value : 5}).then(function() {
        console.log("Ticket bought successfully.");
      }).catch(function(error) {
        console.error("Failed to buy ticket:", error);
      });
    }
    // yes
    if (functionName === "getAllTickets") {
      contractState.methods
        .getAllTickets()
        .call({from: account})
        .then(function (result) {
          console.log("getAllTickets function executed successfully.");
          setTickets(result);
        })
        .catch(function (error) {
          console.error("Failed to execute getAllTickets function:", error);
        });
    }
    
    // yes
    if (functionName === "getAllLotteries") {
      contractState.methods
        .getAllLotteries()
        .call({from: account})
        .then(function (result) {
          console.log("getAllLotteries function executed successfully.");
          setLotteries(result);
        })
        .catch(function (error) {
          console.error("Failed to execute getAllLotteries function:", error);
        });
    }
    if(functionName === "collectTicketRefund") {
      contractState.methods.collectTicketRefund(ticket_no).call().then(function(result) {
        setResults(results => ({ ...results, collectTicketRefund: result }));
      });
    }
    if(functionName === "revealRndNumber") {
      contractState.methods.revealRndNumber(parseInt(ticket_no1)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, revealRndNumber: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, revealRndNumber: "False" }));
      })
    }
    if(functionName === "getLastOwnedTicketNo") {
      contractState.methods.getLastOwnedTicketNo(parseInt(lottery_no)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, getLastOwnedTicketNo: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, getLastOwnedTicketNo: "False" }));
      })
    }
    if(functionName === "getIthOwnedTicketNo") {
      contractState.methods.getIthOwnedTicketNo(parseInt(ticket_no2), parseInt(lottery_no1)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, getIthOwnedTicketNo: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, getIthOwnedTicketNo: "False" }));
      })
    }
    if(functionName === "checkIfTicketWon") {
      contractState.methods.checkIfTicketWon(lottery_no2,ticket_no3).call().then(function(result) {
        setResults(results => ({ ...results, checkIfTicketWon: result }));
      });
    }
    if(functionName === "collectTicketPrize") {
      contractState.methods.collectTicketPrize(parseInt(lottery_no3,ticket_no4)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, collectTicketPrize: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, collectTicketPrize: "False" }));
      })
    }
    if(functionName === "getIthWinningTicket") {
      contractState.methods.getIthWinningTicket(winning_tickets, lottery_no4).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, getIthWinningTicket: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, getIthWinningTicket: "False" }));
      })
    }
    if(functionName === "getLotteryNos") {
      contractState.methods.getLotteryNos(parseInt(unixtimeinweek)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, getLotteryNos: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, getLotteryNos: "False" }));
      })
    }
    if(functionName === "getTotalLotteryMoneyCollected") {
      contractState.methods.getTotalLotteryMoneyCollected(lottery_no5).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, getTotalLotteryMoneyCollected: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, getTotalLotteryMoneyCollected: "False" }));
      })
    }
  }

  return (
    <div className="App">
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getOwner")}>Get Owner</Button>
        {results?.getOwner && <span>Owner: <span className="bold">{results?.getOwner}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={myLotteryTokenAmount}
            onChange={(e) => setMyLotteryTokenAmount(e.target.value)}
            placeholder="Amount"
        />
        <Button onClick={() => handleFunctionCall("depositEther")}>Deposit Ether</Button>
        {results?.depositEther && <span>Result: <span className="bold">{results?.depositEther}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={myLotteryTokenAmount1}
            onChange={(e) => setMyLotteryTokenAmount1(e.target.value)}
            placeholder="Amount"
        />
        <Button onClick={() => handleFunctionCall("withdrawEther")}>Withdraw Ether</Button>
        {results?.withdrawEther && <span>Result: <span className="bold">{results?.withdrawEther}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={address0}
            onChange={(e) => setAddress0(e.target.value)}
            placeholder="Address"
        />
        <Button onClick={() => handleFunctionCall("getBalance")}>Get Balance</Button>
        {results?.getBalance && <span>Balance: <span className="bold">{results?.getBalance}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("generateRandomHash")}>Generate Random Hash</Button>
        {results?.generateRandomHash && <span>Random Hash: <span className="bold">{results?.generateRandomHash}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("LotteryFunction")}>Run The Lottery!</Button>
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={hash_rnd_number}
            onChange={(e) => setHash_rnd_number(e.target.value)}
            placeholder="hash_rnd_number"
        />
        <input
            type="text"
            value={ticket_type}
            onChange={(e) => setTicket_type(e.target.value)}
            placeholder="Ticket Type (1/2/3)"
        />
        <Button onClick={() => handleFunctionCall("buyTicket")}>Buy Ticket</Button>
      </div>
      <br/>
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getAllTickets")}>
          Get All Tickets
        </Button>
        {tickets.length > 0 && (
          <div>
            <span>All Tickets:</span>
            {tickets.map((ticket, index) => (
              <div key={index} className="ticket-info">
                <span>Ticket {index + 1}:</span>
                <br/>
                <span>Owner: {ticket.ticketOwnerAddress}</span>
                <br/>
                <span>Hash: {ticket.hash_randomNo}</span>
                <br/>
                <span>Ticket ID: {ticket.ticket_id}</span>
                <br/>
                <span>Type: {ticket.ticketType}</span>
                <br/>
                <span>Status: {ticket.ticketStatus}</span>
                <br/>
                <span>Ticket Won?: {ticket.ticketWin}</span>
                <br/>
                <span>Lottery no: {ticket.lotteryNo}</span>
                <br/>
                <br/>
              </div>
            ))}
          </div>
        )}
      </div>
      <br/>
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getAllLotteries")}>
          Get All Lotteries
        </Button>
        {lotteries.length > 0 && (
          <div>
            <span>All Lotteries:</span>
            {lotteries.map((lottery, index) => (
              <div key={index} className="lottery-info">
                <span>Lottery {index + 1}:</span>
                <br/>
                <span>Lottery ID: {lottery.lottery_id}</span>
                <br/>
                <span>Prize pool: {lottery.prizePoolofLottery}</span>
                <br/>
                <span>Winning hashes: {lottery.winningHashes.join("\n")}</span>
                <br/>
                <br/>
              </div>
            ))}
          </div>
        )}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={ticket_no}
            onChange={(e) => setTicket_no(e.target.value)}
            placeholder="Ticket_no"
        />
        <Button onClick={() => handleFunctionCall("collectTicketRefund")}>Refund Ticket</Button>
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={ticket_no1}
            onChange={(e) => setTicket_no1(e.target.value)}
            placeholder="Ticket_no"
        />
        <Button onClick={() => handleFunctionCall("revealRndNumber")}>Viev Ticket Hash</Button>
        {results?.revealRndNumber && <span>Ticket Hash: <span className="bold">{results?.revealRndNumber}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={lottery_no}
            onChange={(e) => setLottery_no(e.target.value)}
            placeholder="Lottery_no"
        />
        <Button onClick={() => handleFunctionCall("getLastOwnedTicketNo")}>Viev Last Owned Ticket</Button>
        {results?.getLastOwnedTicketNo && <span>Ticket Id: <span className="bold">{results?.getLastOwnedTicketNo}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={ticket_no2}
            onChange={(e) => setTicket_no2(e.target.value)}
            placeholder="ticket_no"
        />
        <input
            type="text"
            value={lottery_no1}
            onChange={(e) => setLottery_no1(e.target.value)}
            placeholder="Lottery_no"
        />
        <Button onClick={() => handleFunctionCall("getIthOwnedTicketNo")}>Get Ith Owned Ticket No</Button>
        {results?.getIthOwnedTicketNo && <span>Ticket No: <span className="bold">{results?.getIthOwnedTicketNo}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={lottery_no2}
            onChange={(e) => setLottery_no2(e.target.value)}
            placeholder="lottery_no"
        />
        <input
            type="text"
            value={ticket_no3}
            onChange={(e) => setTicket_no3(e.target.value)}
            placeholder="ticket_no"
        />
        <Button onClick={() => handleFunctionCall("checkIfTicketWon")}>Check If Ticket Won</Button>
        {results?.checkIfTicketWon && <span>Won Amount: <span className="bold">{results?.checkIfTicketWon}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={lottery_no3}
            onChange={(e) => setLottery_no3(e.target.value)}
            placeholder="lottery_no"
        />
        <input
            type="text"
            value={ticket_no4}
            onChange={(e) => setTicket_no4(e.target.value)}
            placeholder="ticket_no"
        />
        <Button onClick={() => handleFunctionCall("collectTicketPrize")}>Collect Ticket Prize</Button>
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={winning_tickets}
            onChange={(e) => setWinning_tickets(e.target.value)}
            placeholder="Ith winner "
        />
        <input
            type="text"
            value={lottery_no4}
            onChange={(e) => setLottery_no4(e.target.value)}
            placeholder="lottery_no"
        />
        <Button onClick={() => handleFunctionCall("getIthWinningTicket")}>Get Ith Winning Ticket</Button>
        {results?.checkIfTicketWon && <span>Ticket_no and Amount: <span className="bold">{results?.checkIfTicketWon}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={unixtimeinweek}
            onChange={(e) => setUnixtimeinweek(e.target.value)}
            placeholder="unixtimeinweek"
        />
        <Button onClick={() => handleFunctionCall("getLotteryNos")}>Get Lottery Number</Button>
        {results?.getLotteryNos && <span>Lottery Number: <span className="bold">{results?.getLotteryNos}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={lottery_no5}
            onChange={(e) => setLottery_no5(e.target.value)}
            placeholder="lottery_no"
        />
        <Button onClick={() => handleFunctionCall("getTotalLotteryMoneyCollected")}>Get Total Lottery Money</Button>
        {results?.getTotalLotteryMoneyCollected && <span>Total Lottery Money: <span className="bold">{results?.getTotalLotteryMoneyCollected}</span></span>}
      </div>
      <br/>
    </div>
    
  );
}

export default App;
