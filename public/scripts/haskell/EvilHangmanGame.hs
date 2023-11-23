-- setup game
main = do
  -- get size of dictionary
  let size = length mediumDict
  putStrLn "\n\nWelcome to Evil Hangman!\n\n"
  putStrLn ("The small dictionary contains " ++ show size ++ " words")
  -- get new dict of words of the same size
  putStrLn "Word length?"
  wordLIO <- getLine
  let wordL = read wordLIO :: Int
  let dict = filter ((== wordL) . length) mediumDict
  -- set num of guesses
  putStrLn "Number of guesses?"
  guessesIO <- getLine
  let turns = read guessesIO :: Int
  let progress = getProgress wordL

  -- start playing game
  doTurn turns dict "" progress

getProgress 0 = []
getProgress size = '-' : getProgress (size - 1)

doTurn turnsLeft dict ls progress = do
  putStrLn ("\n\nYou have " ++ show turnsLeft ++ " guesses left.")
  putStrLn ("Letters guessed: " ++ show ls)
  putStrLn ("Word: " ++ progress)
  putStrLn "Guess a letter:"
  lIO <- getLine
  let l = head lIO
  let guesses = l : ls
  let matchingWords = simplify guesses dict
  let longestTuple = findLongestTuple matchingWords
  let newDict = snd longestTuple
  let newCase = fst longestTuple
  --mapM (\(x, y) -> putStrLn ("    " ++ x ++ " matches " ++ show y)) matchingWords
  --putStrLn ("  Using pattern " ++ newCase ++ " which matches " ++ show (length newDict) ++ " words")

  -- check for win
  if filter (=='-') newCase == ""
    then finished (fst (head matchingWords))
    else continue turnsLeft newDict guesses newCase lIO progress

continue turnsLeft newDict guesses newCase lIO progress = do
  -- print if guess was good or not
  if progress == newCase
    then putStrLn ("Sorry there's no " ++ lIO ++ "'s")
    else putStrLn "Good Guess!"
  -- start new turn
  if turnsLeft <= 1
    then noGuesses (head newDict)
    else doTurn (turnsLeft - 1) newDict guesses newCase

finished word = do
  putStrLn ("\nYou guessed it! The word was " ++ show word)

findLongestTuple [] = error "Cannot have empty list"
-- Call fltJR with the first tuple and the rest of the list.
findLongestTuple (x : xs) = findLongestList x xs
  where
    -- recursively returns the tuple with the longest list until the longest is known
    findLongestList t [] = t
    findLongestList t (u : us)
      -- if T has a longer list call with t as new longest
      | length (snd t) >= length (snd u) = findLongestList t us
      | otherwise = findLongestList u us

noGuesses answer = do
  putStrLn ("You are out of guesses :(\nThe answer was " ++answer)

-- removes duplicates of everything given from checkguess
simplify guesses dict = helper [] (checkGuess guesses dict)
  where
    helper seen [] = seen
    helper seen (x : xs)
      | contains x seen = helper (replace x seen) xs
      | otherwise = helper (seen ++ [x]) xs
    contains x [] = False
    contains x (y : ys)
      | fst x == fst y = True
      | otherwise = contains x ys
    replace x [] = [x]
    replace x (seen : seens)
      | fst x == fst seen = (fst seen, snd seen ++ snd x) : seens
      | otherwise = seen : replace x seens

checkGuess ls = concatMap (\w -> map (match w) [ls])

match word ls = (myFilter (`elem` ls) word, [word])
  where
    myFilter f = map (\c -> if f c then c else '-')
