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
  let [ticket_no5, setTicket_no5] = useState("");
  let [ticket_no6, setTicket_no6] = useState("");
  let [ticket_no7, setTicket_no7] = useState("");
  let [lottery_no6, setLottery_no6] = useState("");
  let [lottery_no7, setLottery_no7] = useState("");
  let [lottery_no8, setLottery_no8] = useState("");
  let [lottery_no9, setLottery_no9] = useState("");
  let [lottery_no10, setLottery_no10] = useState("");
  let [lottery_no11, setLottery_no11] = useState("");
  let [ithTicket, setIthTicket] = useState("");
  let [ithWonTicket, setIthWonTicket] = useState("");
  let [unixtimeinweek, setUnixtimeinweek] = useState("");
  const [tickets, setTickets] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [revealedNumber, setRevealedNumber] = useState("");
  const [lastTicketNumber, setLastTicketNumber] = useState("");
  const [wonAmount, setWonAmount] = useState("");
  const [ithTicketNo, setIthTicketNo] = useState("");
  const [ithWonTicketNo, setIthWonTicketNo] = useState("");
  const [ithTicketStatus, setIthTicketStatus] = useState("");
  const [ithWonTicketStatus, setIthWonTicketStatus] = useState("");
  const [lotteryNo, setLotteryNo] = useState("");
  const [results, setResults] = useState({});
  const [lotteryMoney, setLotteryMoney] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
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
    // tried with another acc and it did not work
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
    // yes
    if(functionName === "collectTicketRefund") {
      contractState.methods.collectTicketRefund(ticket_no).send({from: account}).then(function(result) {
        setResults(results => ({ ...results, collectTicketRefund: result }));
      });
    }
    // yes
    if (functionName === "revealRndNumber") {
      contractState.methods
      .revealRndNumber(parseInt(ticket_no5))
      .call({ from: account })
      .then((result) => {
        console.log("revealRndNumber executed successfully:", result);
        setRevealedNumber(result);
      })
      .catch((error) => {
        console.error("Failed to execute revealRndNumber:", error);
      });
    }
    // yes
    if (functionName === "getLastOwnedTicketNo") {
      contractState.methods
      .getLastOwnedTicketNo(parseInt(lottery_no6))
      .call({ from: account })
      .then((result) => {
        console.log("getLastOwnedTicketNo executed successfully:", result);
        setLastTicketNumber(result);
      })
      .catch((error) => {
        console.error("Failed to execute getLastOwnedTicketNo:", error);
      });
    }
    // yes
    if (functionName === "getIthOwnedTicketNo") {
      contractState.methods
      .getIthOwnedTicketNo(parseInt(ithTicket),parseInt(lottery_no7))
      .call({ from: account })
      .then((result) => {
        console.log("getIthOwnedTicketNo executed successfully:", result);
        setIthTicketNo(result[0]);
        setIthTicketStatus(result[1]);
      })
      .catch((error) => {
        console.error("Failed to execute getIthOwnedTicketNo:", error);
      });
    }
    // yes
    if (functionName === "checkIfTicketWon") {
      contractState.methods
      .checkIfTicketWon(parseInt(lottery_no8),parseInt(ticket_no6))
      .call({ from: account })
      .then((result) => {
        console.log("checkIfTicketWon executed successfully:", result);
        setWonAmount(result);
      })
      .catch((error) => {
        console.error("Failed to execute checkIfTicketWon:", error);
      });
    }
    // yes, displays error but cannot test because nobody wins
    if (functionName === "collectTicketPrize") {
      contractState.methods
      .collectTicketPrize(parseInt(lottery_no9),parseInt(ticket_no7))
      .send({ from: account })
      .then((result) => {
        console.log("collectTicketPrize executed successfully:", result);
      })
      .catch((error) => {
        console.error("Failed to execute collectTicketPrize:", error);
        setErrorMessage("Unfortunatelly, ticket did not win.");
      });
    }
    // yes, displays error but cannot test because nobody wins
    if (functionName === "getIthWinningTicket") {
      contractState.methods
        .getIthWinningTicket(parseInt(ithWonTicket), parseInt(lottery_no10))
        .send({ from: account })
        .then((result) => {
          console.log("getIthWinningTicket executed successfully:", result);
          setIthWonTicketNo(result[0]);
          setIthWonTicketStatus(result[1]);
        })
        .catch((error) => {
          console.error("Failed to execute getIthWinningTicket:", error);
          setErrorMessage("There is no winning ticket.");
        });
    }
    // yes
    if (functionName === "getLotteryNos") {
      contractState.methods
      .getLotteryNos(parseInt(unixtimeinweek))
      .call({ from: account })
      .then((result) => {
        console.log("getLotteryNos executed successfully:", result);
        setLotteryNo(result);
      })
      .catch((error) => {
        console.error("Failed to execute getLotteryNos:", error);
      });
    }
    // yes
    if (functionName === "getTotalLotteryMoneyCollected") {
      contractState.methods
      .getTotalLotteryMoneyCollected(parseInt(lottery_no11))
      .call({ from: account })
      .then((result) => {
        console.log("getTotalLotteryMoneyCollected executed successfully:", result);
        setLotteryMoney(result);
      })
      .catch((error) => {
        console.error("Failed to execute getTotalLotteryMoneyCollected:", error);
      });
    }
  };
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
          value={ticket_no5}
          onChange={(e) => setTicket_no5(e.target.value)}
          placeholder="Ticket No"
        />
        <Button onClick={() => handleFunctionCall("revealRndNumber")}>Reveal Random Number</Button>
        {revealedNumber && <span>Revealed Random Number: {revealedNumber}</span>}
      </div>
      <br/>
      <div className="function-container">
        <input
          type="text"
          value={lottery_no6}
          onChange={(e) => setLottery_no6(e.target.value)}
          placeholder="Lottery No"
        />
        <Button onClick={() => handleFunctionCall("getLastOwnedTicketNo")}>Reveal Last Ticket Number</Button>
        {lastTicketNumber && <span>Last Ticket Number: {lastTicketNumber}</span>}
      </div>
      <br/>
      <div className="function-container">
        <input
          type="text"
          value={ithTicket}
          onChange={(e) => setIthTicket(e.target.value)}
          placeholder="Ticket No"
        />
        <input
          type="text"
          value={lottery_no7}
          onChange={(e) => setLottery_no7(e.target.value)}
          placeholder="Lottery No"
        />
        <Button onClick={() => handleFunctionCall("getIthOwnedTicketNo")}>Get Ith Owned Ticket Number</Button>
        {ithTicketNo && <span>Ith Owned Ticket Number: {ithTicketNo}</span>}
        {ithTicketStatus && <span>Ith Owned Ticket Status: {ithTicketStatus}</span>}
      </div>
      <br/>
      <div className="function-container">
        <input
          type="text"
          value={lottery_no8}
          onChange={(e) => setLottery_no8(e.target.value)}
          placeholder="Lottery No"
        />
        <input
          type="text"
          value={ticket_no6}
          onChange={(e) => setTicket_no6(e.target.value)}
          placeholder="Ticket No"
        />
        <Button onClick={() => handleFunctionCall("checkIfTicketWon")}>Check If Ticket Won</Button>
        {wonAmount && <span>Won Amount: {wonAmount}</span>}
      </div>
      <br/>
      <div className="function-container">
        <input
          type="text"
          value={lottery_no9}
          onChange={(e) => setLottery_no9(e.target.value)}
          placeholder="Lottery No"
        />
        <input
          type="text"
          value={ticket_no7}
          onChange={(e) => setTicket_no7(e.target.value)}
          placeholder="Ticket No"
        />
        <Button onClick={() => handleFunctionCall("collectTicketPrize")}>Collect Ticket Prize</Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <br/>
      <div className="function-container">
        <input
          type="text"
          value={ithWonTicket}
          onChange={(e) => setIthWonTicket(e.target.value)}
          placeholder="Ticket No"
        />
        <input
          type="text"
          value={lottery_no10}
          onChange={(e) => setLottery_no10(e.target.value)}
          placeholder="Lottery No"
        />
        <Button onClick={() => handleFunctionCall("getIthWinningTicket")}>Get Ith Won Ticket Number</Button>
        {ithWonTicketNo && <span>Ith Won Ticket Number: {ithWonTicketNo}</span>}
        {ithWonTicketStatus && <span>Ith Won Ticket Status: {ithWonTicketStatus}</span>}
        {errorMessage1 && <p className="error-message">{errorMessage1}</p>}
      </div>
      <br/>
      <div className="function-container">
        <input
          type="text"
          value={unixtimeinweek}
          onChange={(e) => setUnixtimeinweek(e.target.value)}
          placeholder="Unix Time In Week (start: 1683000000)"
        />
        <Button onClick={() => handleFunctionCall("getLotteryNos")}>Get Lottery No In Given Time</Button>
        {lotteryNo && <span>Lottery No: {lotteryNo}</span>}
      </div>
      <br/>
      <div className="function-container">
        <input
          type="text"
          value={lottery_no11}
          onChange={(e) => setLottery_no11(e.target.value)}
          placeholder="Lottery No"
        />
        <Button onClick={() => handleFunctionCall("getTotalLotteryMoneyCollected")}>Get Lottery Money</Button>
        {lotteryMoney && <span>Lottery Money: {lotteryMoney}</span>}
      </div>
      <br/>
    </div>
    
  );
}

export default App;
